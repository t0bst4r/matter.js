/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  BLE_MATTER_C1_CHARACTERISTIC_UUID,
  BLE_MATTER_C2_CHARACTERISTIC_UUID,
  BLE_MATTER_C3_CHARACTERISTIC_UUID,
  BLE_MATTER_SERVICE_UUID,
  BLE_MAXIMUM_BTP_MTU,
  BTP_CONN_RSP_TIMEOUT_MS,
  BTP_MAXIMUM_WINDOW_SIZE,
  BTP_SUPPORTED_VERSIONS,
  Ble,
  BleError,
  BtpFlowError,
  BtpSessionHandler
} from "@project-chip/matter.js/ble";
import { BtpCodec } from "@project-chip/matter.js/codec";
import { InternalError } from "@project-chip/matter.js/common";
import { Logger } from "@project-chip/matter.js/log";
import { Time } from "@project-chip/matter.js/time";
import { ByteArray, createPromise } from "@project-chip/matter.js/util";
import {
  BleErrorCode,
  BleError as ReactNativeBleError
} from "react-native-ble-plx";
const logger = Logger.get("BleChannel");
class ReactNativeBleCentralInterface {
  constructor() {
    this.openChannels = /* @__PURE__ */ new Map();
  }
  async openChannel(address) {
    if (address.type !== "ble") {
      throw new InternalError(`Unsupported address type ${address.type}.`);
    }
    if (this.onMatterMessageListener === void 0) {
      throw new InternalError(`Network Interface was not added to the system yet.`);
    }
    const { peripheral, hasAdditionalAdvertisementData } = Ble.get().getBleScanner().getDiscoveredDevice(address.peripheralAddress);
    if (this.openChannels.has(address)) {
      throw new BleError(
        `Peripheral ${address.peripheralAddress} is already connected. Only one connection supported right now.`
      );
    }
    logger.debug(`Connect to Peripheral now`);
    let device;
    try {
      device = await peripheral.connect();
    } catch (error) {
      if (error instanceof ReactNativeBleError && error.errorCode === BleErrorCode.DeviceAlreadyConnected) {
        device = peripheral;
      } else {
        throw new BleError(`Error connecting to peripheral: ${error.message}`);
      }
    }
    logger.debug(`Peripheral connected successfully, MTU = ${device.mtu}`);
    device = await device.discoverAllServicesAndCharacteristics();
    const services = await device.services();
    for (const service of services) {
      logger.debug(`found service: ${service.uuid}`);
      if (service.uuid !== BLE_MATTER_SERVICE_UUID) continue;
      const characteristics = await device.characteristicsForService(service.uuid);
      let characteristicC1ForWrite;
      let characteristicC2ForSubscribe;
      let additionalCommissioningRelatedData;
      for (const characteristic of characteristics) {
        logger.debug("found characteristic:", characteristic.uuid);
        switch (characteristic.uuid) {
          case BLE_MATTER_C1_CHARACTERISTIC_UUID:
            logger.debug("found C1 characteristic");
            characteristicC1ForWrite = characteristic;
            break;
          case BLE_MATTER_C2_CHARACTERISTIC_UUID:
            logger.debug("found C2 characteristic");
            characteristicC2ForSubscribe = characteristic;
            break;
          case BLE_MATTER_C3_CHARACTERISTIC_UUID:
            logger.debug("found C3 characteristic");
            if (hasAdditionalAdvertisementData) {
              logger.debug("reading additional commissioning related data");
              const characteristicWithValue = await service.readCharacteristic(characteristic.uuid);
              if (characteristicWithValue.value !== null) {
                additionalCommissioningRelatedData = ByteArray.fromBase64(
                  characteristicWithValue.value
                );
              } else {
                logger.debug("no value in characteristic C3");
              }
            }
        }
      }
      if (!characteristicC1ForWrite || !characteristicC2ForSubscribe) {
        logger.debug("missing characteristics");
        continue;
      }
      this.openChannels.set(address, peripheral);
      return await ReactNativeBleChannel.create(
        peripheral,
        characteristicC1ForWrite,
        characteristicC2ForSubscribe,
        this.onMatterMessageListener,
        additionalCommissioningRelatedData
      );
    }
    throw new BleError(`No Matter service found on peripheral ${peripheral.id}`);
  }
  onData(listener) {
    this.onMatterMessageListener = listener;
    return {
      close: async () => await this.close()
    };
  }
  async close() {
    for (const peripheral of this.openChannels.values()) {
      await peripheral.cancelConnection();
    }
  }
}
class ReactNativeBleChannel {
  constructor(peripheral, btpSession) {
    this.peripheral = peripheral;
    this.btpSession = btpSession;
    this.connected = true;
    this.disconnectSubscription = peripheral.onDisconnected((error) => {
      logger.debug(`Disconnected from peripheral ${peripheral.id}: ${error}`);
      this.connected = false;
      this.disconnectSubscription.remove();
      void this.btpSession.close();
    });
  }
  static async create(peripheral, characteristicC1ForWrite, characteristicC2ForSubscribe, onMatterMessageListener, _additionalCommissioningRelatedData) {
    let mtu = peripheral.mtu ?? 0;
    if (mtu > BLE_MAXIMUM_BTP_MTU) {
      mtu = BLE_MAXIMUM_BTP_MTU;
    }
    logger.debug(`Using MTU=${mtu} (Peripheral MTU=${peripheral.mtu})`);
    const btpHandshakeRequest = BtpCodec.encodeBtpHandshakeRequest({
      versions: BTP_SUPPORTED_VERSIONS,
      attMtu: mtu,
      clientWindowSize: BTP_MAXIMUM_WINDOW_SIZE
    });
    logger.debug(`sending BTP handshake request: ${Logger.toJSON(btpHandshakeRequest)}`);
    characteristicC1ForWrite = await characteristicC1ForWrite.writeWithResponse(btpHandshakeRequest.toBase64());
    const btpHandshakeTimeout = Time.getTimer("BLE handshake timeout", BTP_CONN_RSP_TIMEOUT_MS, async () => {
      await peripheral.cancelConnection();
      logger.debug("Handshake Response not received. Disconnected from peripheral");
    }).start();
    logger.debug("subscribing to C2 characteristic");
    const { promise: handshakeResponseReceivedPromise, resolver } = createPromise();
    let handshakeReceived = false;
    const handshakeSubscription = characteristicC2ForSubscribe.monitor((error, characteristic) => {
      if (error !== null || characteristic === null) {
        if (error instanceof ReactNativeBleError && error.errorCode === 2 && handshakeReceived) {
          return;
        }
        logger.debug("Error while monitoring C2 characteristic", error);
        return;
      }
      const characteristicData = characteristic.value;
      if (characteristicData === null) {
        logger.debug("C2 characteristic value is null");
        return;
      }
      const data = ByteArray.fromBase64(characteristicData);
      logger.debug(`received first data on C2: ${data.toHex()}`);
      if (data[0] === 101 && data[1] === 108 && data.length === 6) {
        logger.info(`Received Matter handshake response: ${data.toHex()}.`);
        btpHandshakeTimeout.stop();
        resolver(data);
      }
    });
    const handshakeResponse = await handshakeResponseReceivedPromise;
    handshakeReceived = true;
    handshakeSubscription.remove();
    let connectionCloseExpected = false;
    const btpSession = await BtpSessionHandler.createAsCentral(
      new ByteArray(handshakeResponse),
      // callback to write data to characteristic C1
      async (data) => {
        characteristicC1ForWrite = await characteristicC1ForWrite.writeWithResponse(data.toBase64());
      },
      // callback to disconnect the BLE connection
      async () => {
        connectionCloseExpected = true;
        dataSubscription.remove();
        await peripheral.cancelConnection();
        logger.debug("disconnected from peripheral");
      },
      // callback to forward decoded and de-assembled Matter messages to ExchangeManager
      async (data) => {
        if (onMatterMessageListener === void 0) {
          throw new InternalError(`No listener registered for Matter messages`);
        }
        onMatterMessageListener(bleChannel, data);
      }
    );
    const dataSubscription = characteristicC2ForSubscribe.monitor((error, characteristic) => {
      if (error !== null || characteristic === null) {
        if (error instanceof ReactNativeBleError && error.errorCode === 2 && connectionCloseExpected) {
          return;
        }
        logger.debug("Error while monitoring C2 characteristic", error);
        return;
      }
      const characteristicData = characteristic.value;
      if (characteristicData === null) {
        logger.debug("C2 characteristic value is null");
        return;
      }
      const data = ByteArray.fromBase64(characteristicData);
      logger.debug(`received data on C2: ${data.toHex}`);
      void btpSession.handleIncomingBleData(new ByteArray(data));
    });
    const bleChannel = new ReactNativeBleChannel(peripheral, btpSession);
    return bleChannel;
  }
  /**
   * Send a Matter message to the connected device - need to do BTP assembly first.
   *
   * @param data
   */
  async send(data) {
    if (!this.connected) {
      logger.debug("Cannot send data because not connected to peripheral.");
      return;
    }
    if (this.btpSession === void 0) {
      throw new BtpFlowError(`Cannot send data, no BTP session initialized`);
    }
    await this.btpSession.sendMatterMessage(data);
  }
  // Channel<ByteArray>
  get name() {
    return `ble://${this.peripheral.id}`;
  }
  async close() {
    await this.btpSession.close();
    this.disconnectSubscription.remove();
    await this.peripheral.cancelConnection();
  }
}
export {
  ReactNativeBleCentralInterface,
  ReactNativeBleChannel
};
//# sourceMappingURL=ReactNativeBleChannel.js.map
