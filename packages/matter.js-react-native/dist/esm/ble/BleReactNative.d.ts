/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */
import { Ble } from "@project-chip/matter.js/ble";
import { InstanceBroadcaster, Scanner, TransportInterface } from "@project-chip/matter.js/common";
import { NetInterface } from "@project-chip/matter.js/net";
export declare class BleReactNative extends Ble {
    private bleCentral;
    constructor();
    getBleCentralInterface(): NetInterface;
    getBleScanner(): Scanner;
    getBlePeripheralInterface(): TransportInterface;
    getBleBroadcaster(): InstanceBroadcaster;
}
//# sourceMappingURL=BleReactNative.d.ts.map