/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */
import { MatterError } from "@project-chip/matter.js/common";
import { ByteArray } from "@project-chip/matter.js/util";
import { Device } from "react-native-ble-plx";
export declare class BluetoothUnauthorizedError extends MatterError {
}
export declare class BluetoothUnsupportedError extends MatterError {
}
export declare class ReactNativeBleClient {
    private readonly bleManager;
    private readonly discoveredPeripherals;
    private shouldScan;
    private isScanning;
    private bleState;
    private deviceDiscoveredCallback;
    constructor();
    setDiscoveryCallback(callback: (peripheral: Device, manufacturerData: ByteArray) => void): void;
    startScanning(): Promise<void>;
    stopScanning(): Promise<void>;
    private handleDiscoveredDevice;
}
//# sourceMappingURL=ReactNativeBleClient.d.ts.map