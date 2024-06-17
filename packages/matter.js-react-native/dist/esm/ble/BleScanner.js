/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */
import { BleError } from "@project-chip/matter.js/ble";
import { BtpCodec } from "@project-chip/matter.js/codec";
import { VendorId } from "@project-chip/matter.js/datatype";
import { Logger } from "@project-chip/matter.js/log";
import { Time } from "@project-chip/matter.js/time";
import { createPromise } from "@project-chip/matter.js/util";
const logger = Logger.get("BleScanner");
class BleScanner {
  constructor(bleClient) {
    this.bleClient = bleClient;
    this.recordWaiters = /* @__PURE__ */ new Map();
    this.discoveredMatterDevices = /* @__PURE__ */ new Map();
    this.bleClient.setDiscoveryCallback(
      (address, manufacturerData) => this.handleDiscoveredDevice(address, manufacturerData)
    );
  }
  getDiscoveredDevice(address) {
    const device = this.discoveredMatterDevices.get(address);
    if (device === void 0) {
      throw new BleError(`No device found for address ${address}`);
    }
    return device;
  }
  /**
   * Registers a deferred promise for a specific queryId together with a timeout and return the promise.
   * The promise will be resolved when the timer runs out latest.
   */
  async registerWaiterPromise(queryId, timeoutSeconds, resolveOnUpdatedRecords = true) {
    const { promise, resolver } = createPromise();
    const timer = Time.getTimer(
      "BLE query timeout",
      timeoutSeconds * 1e3,
      () => this.finishWaiter(queryId, true)
    ).start();
    this.recordWaiters.set(queryId, { resolver, timer, resolveOnUpdatedRecords });
    logger.debug(
      `Registered waiter for query ${queryId} with timeout ${timeoutSeconds} seconds${resolveOnUpdatedRecords ? "" : " (not resolving on updated records)"}`
    );
    await promise;
  }
  /**
   * Remove a waiter promise for a specific queryId and stop the connected timer. If required also resolve the
   * promise.
   */
  finishWaiter(queryId, resolvePromise, isUpdatedRecord = false) {
    const waiter = this.recordWaiters.get(queryId);
    if (waiter === void 0) return;
    const { timer, resolver, resolveOnUpdatedRecords } = waiter;
    if (isUpdatedRecord && !resolveOnUpdatedRecords) return;
    logger.debug(`Finishing waiter for query ${queryId}, resolving: ${resolvePromise}`);
    timer.stop();
    if (resolvePromise) {
      resolver();
    }
    this.recordWaiters.delete(queryId);
  }
  cancelCommissionableDeviceDiscovery(identifier) {
    const queryKey = this.buildCommissionableQueryIdentifier(identifier);
    this.finishWaiter(queryKey, true);
  }
  handleDiscoveredDevice(peripheral, manufacturerServiceData) {
    logger.debug(
      `Discovered device ${peripheral.id} "${peripheral.localName}" ${manufacturerServiceData?.toHex()}`
    );
    try {
      const { discriminator, vendorId, productId, hasAdditionalAdvertisementData } = BtpCodec.decodeBleAdvertisementServiceData(manufacturerServiceData);
      const commissionableDevice = {
        deviceIdentifier: peripheral.id,
        D: discriminator,
        SD: discriminator >> 8 & 15,
        VP: `${vendorId}+${productId}`,
        CM: 1,
        // Can be no other mode,
        addresses: [{ type: "ble", peripheralAddress: peripheral.id }]
      };
      logger.debug(`Discovered device ${peripheral.id} data: ${JSON.stringify(commissionableDevice)}`);
      const deviceExisting = this.discoveredMatterDevices.has(peripheral.id);
      this.discoveredMatterDevices.set(peripheral.id, {
        deviceData: commissionableDevice,
        peripheral,
        hasAdditionalAdvertisementData
      });
      const queryKey = this.findCommissionableQueryIdentifier(commissionableDevice);
      if (queryKey !== void 0) {
        this.finishWaiter(queryKey, true, deviceExisting);
      }
    } catch (error) {
      logger.debug(`Seems not to be a valid Matter device: Failed to decode device data: ${error}`);
    }
  }
  findCommissionableQueryIdentifier(record) {
    const longDiscriminatorQueryId = this.buildCommissionableQueryIdentifier({ longDiscriminator: record.D });
    if (this.recordWaiters.has(longDiscriminatorQueryId)) {
      return longDiscriminatorQueryId;
    }
    const shortDiscriminatorQueryId = this.buildCommissionableQueryIdentifier({ shortDiscriminator: record.SD });
    if (this.recordWaiters.has(shortDiscriminatorQueryId)) {
      return shortDiscriminatorQueryId;
    }
    if (record.VP !== void 0) {
      const vendorIdQueryId = this.buildCommissionableQueryIdentifier({
        vendorId: VendorId(parseInt(record.VP.split("+")[0]))
      });
      if (this.recordWaiters.has(vendorIdQueryId)) {
        return vendorIdQueryId;
      }
      if (record.VP.includes("+")) {
        const productIdQueryId = this.buildCommissionableQueryIdentifier({
          vendorId: VendorId(parseInt(record.VP.split("+")[1]))
        });
        if (this.recordWaiters.has(productIdQueryId)) {
          return productIdQueryId;
        }
      }
    }
    if (this.recordWaiters.has("*")) {
      return "*";
    }
    return void 0;
  }
  /**
   * Builds an identifier string for commissionable queries based on the given identifier object.
   * Some identifiers are identical to the official DNS-SD identifiers, others are custom.
   */
  buildCommissionableQueryIdentifier(identifier) {
    if ("longDiscriminator" in identifier) {
      return `D:${identifier.longDiscriminator}`;
    } else if ("shortDiscriminator" in identifier) {
      return `SD:${identifier.shortDiscriminator}`;
    } else if ("vendorId" in identifier) {
      return `V:${identifier.vendorId}`;
    } else if ("productId" in identifier) {
      return `P:${identifier.productId}`;
    } else return "*";
  }
  getCommissionableDevices(identifier) {
    const storedRecords = Array.from(this.discoveredMatterDevices.values());
    const foundRecords = new Array();
    if ("longDiscriminator" in identifier) {
      foundRecords.push(...storedRecords.filter(({ deviceData: { D } }) => D === identifier.longDiscriminator));
    } else if ("shortDiscriminator" in identifier) {
      foundRecords.push(
        ...storedRecords.filter(({ deviceData: { SD } }) => SD === identifier.shortDiscriminator)
      );
    } else if ("vendorId" in identifier) {
      foundRecords.push(
        ...storedRecords.filter(
          ({ deviceData: { VP } }) => VP === `${identifier.vendorId}` || VP?.startsWith(`${identifier.vendorId}+`)
        )
      );
    } else if ("productId" in identifier) {
      foundRecords.push(
        ...storedRecords.filter(({ deviceData: { VP } }) => VP?.endsWith(`+${identifier.productId}`))
      );
    } else {
      foundRecords.push(...storedRecords.filter(({ deviceData: { CM } }) => CM === 1 || CM === 2));
    }
    return foundRecords;
  }
  async findOperationalDevice() {
    logger.info(`skip BLE scan because scanning for operational devices is not supported`);
    return void 0;
  }
  getDiscoveredOperationalDevice() {
    logger.info(`skip BLE scan because scanning for operational devices is not supported`);
    return void 0;
  }
  async findCommissionableDevices(identifier, timeoutSeconds = 10) {
    let storedRecords = this.getCommissionableDevices(identifier);
    if (storedRecords.length === 0) {
      const queryKey = this.buildCommissionableQueryIdentifier(identifier);
      await this.bleClient.startScanning();
      await this.registerWaiterPromise(queryKey, timeoutSeconds);
      storedRecords = this.getCommissionableDevices(identifier);
      await this.bleClient.stopScanning();
    }
    return storedRecords.map(({ deviceData }) => deviceData);
  }
  async findCommissionableDevicesContinuously(identifier, callback, timeoutSeconds = 60) {
    const discoveredDevices = /* @__PURE__ */ new Set();
    const discoveryEndTime = Time.nowMs() + timeoutSeconds * 1e3;
    const queryKey = this.buildCommissionableQueryIdentifier(identifier);
    await this.bleClient.startScanning();
    while (true) {
      this.getCommissionableDevices(identifier).forEach(({ deviceData }) => {
        const { deviceIdentifier } = deviceData;
        if (!discoveredDevices.has(deviceIdentifier)) {
          discoveredDevices.add(deviceIdentifier);
          callback(deviceData);
        }
      });
      const remainingTime = Math.ceil((discoveryEndTime - Time.nowMs()) / 1e3);
      if (remainingTime <= 0) {
        break;
      }
      await this.registerWaiterPromise(queryKey, remainingTime, false);
    }
    await this.bleClient.stopScanning();
    return this.getCommissionableDevices(identifier).map(({ deviceData }) => deviceData);
  }
  getDiscoveredCommissionableDevices(identifier) {
    return this.getCommissionableDevices(identifier).map(({ deviceData }) => deviceData);
  }
  close() {
    void this.bleClient.stopScanning();
    [...this.recordWaiters.keys()].forEach(
      (queryId) => this.finishWaiter(queryId, !!this.recordWaiters.get(queryId)?.timer)
    );
  }
}
export {
  BleScanner
};
//# sourceMappingURL=BleScanner.js.map
