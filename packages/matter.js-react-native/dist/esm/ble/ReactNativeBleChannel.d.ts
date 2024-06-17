/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */
import { BtpSessionHandler } from "@project-chip/matter.js/ble";
import { Channel, Listener, ServerAddress } from "@project-chip/matter.js/common";
import { NetInterface } from "@project-chip/matter.js/net";
import { ByteArray } from "@project-chip/matter.js/util";
import { Characteristic, Device } from "react-native-ble-plx";
export declare class ReactNativeBleCentralInterface implements NetInterface {
    private openChannels;
    private onMatterMessageListener;
    openChannel(address: ServerAddress): Promise<Channel<ByteArray>>;
    onData(listener: (socket: Channel<ByteArray>, data: ByteArray) => void): Listener;
    close(): Promise<void>;
}
export declare class ReactNativeBleChannel implements Channel<ByteArray> {
    private readonly peripheral;
    private readonly btpSession;
    static create(peripheral: Device, characteristicC1ForWrite: Characteristic, characteristicC2ForSubscribe: Characteristic, onMatterMessageListener: (socket: Channel<ByteArray>, data: ByteArray) => void, _additionalCommissioningRelatedData?: ByteArray): Promise<ReactNativeBleChannel>;
    private connected;
    private disconnectSubscription;
    constructor(peripheral: Device, btpSession: BtpSessionHandler);
    /**
     * Send a Matter message to the connected device - need to do BTP assembly first.
     *
     * @param data
     */
    send(data: ByteArray): Promise<void>;
    get name(): string;
    close(): Promise<void>;
}
//# sourceMappingURL=ReactNativeBleChannel.d.ts.map