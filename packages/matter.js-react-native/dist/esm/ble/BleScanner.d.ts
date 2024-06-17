/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommissionableDevice, CommissionableDeviceIdentifiers, Scanner } from "@project-chip/matter.js/common";
import { Device } from "react-native-ble-plx";
import { ReactNativeBleClient } from "./ReactNativeBleClient.js";
export type DiscoveredBleDevice = {
    deviceData: CommissionableDeviceData;
    peripheral: Device;
    hasAdditionalAdvertisementData: boolean;
};
type CommissionableDeviceData = CommissionableDevice & {
    SD: number;
};
export declare class BleScanner implements Scanner {
    private readonly bleClient;
    private readonly recordWaiters;
    private readonly discoveredMatterDevices;
    constructor(bleClient: ReactNativeBleClient);
    getDiscoveredDevice(address: string): DiscoveredBleDevice;
    /**
     * Registers a deferred promise for a specific queryId together with a timeout and return the promise.
     * The promise will be resolved when the timer runs out latest.
     */
    private registerWaiterPromise;
    /**
     * Remove a waiter promise for a specific queryId and stop the connected timer. If required also resolve the
     * promise.
     */
    private finishWaiter;
    cancelCommissionableDeviceDiscovery(identifier: CommissionableDeviceIdentifiers): void;
    private handleDiscoveredDevice;
    private findCommissionableQueryIdentifier;
    /**
     * Builds an identifier string for commissionable queries based on the given identifier object.
     * Some identifiers are identical to the official DNS-SD identifiers, others are custom.
     */
    private buildCommissionableQueryIdentifier;
    private getCommissionableDevices;
    findOperationalDevice(): Promise<undefined>;
    getDiscoveredOperationalDevice(): undefined;
    findCommissionableDevices(identifier: CommissionableDeviceIdentifiers, timeoutSeconds?: number): Promise<CommissionableDevice[]>;
    findCommissionableDevicesContinuously(identifier: CommissionableDeviceIdentifiers, callback: (device: CommissionableDevice) => void, timeoutSeconds?: number): Promise<CommissionableDevice[]>;
    getDiscoveredCommissionableDevices(identifier: CommissionableDeviceIdentifiers): CommissionableDevice[];
    close(): void;
}
export {};
//# sourceMappingURL=BleScanner.d.ts.map