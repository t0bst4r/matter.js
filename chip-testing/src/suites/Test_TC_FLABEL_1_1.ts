/**
 * @license
 * Copyright 2022 The node-matter Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommissioningServer } from "@project-chip/matter-node.js";
import { DeviceTypeId, VendorId } from "@project-chip/matter.js/datatype";
import { OnOffPluginUnitDevice } from "@project-chip/matter.js/device";
import { StorageManager } from "@project-chip/matter.js/storage";
import { DeviceTestInstance } from "../DeviceTestInstance";

/**
 * Test case "TC_FLABEL_1.1"
 * 95.1.1. [TC-ULABEL-1.1] Global Attributes with DUT as Server
 */
export class Test_TC_FLABEL_1_1Test extends DeviceTestInstance {
    onOffDevice = new OnOffPluginUnitDevice();
    commissioningServer?: CommissioningServer;

    constructor(storageManager: StorageManager, overrideTestName?: string) {
        super(overrideTestName ?? "Test_TC_FLABEL_1_1", "GeneralTestPicsFile.txt", storageManager);
    }

    async setupCommissioningServer() {
        this.commissioningServer = new CommissioningServer({
            port: 5540,
            deviceName: "Testdevice",
            deviceType: DeviceTypeId(this.onOffDevice.deviceType),
            passcode: 20202021,
            discriminator: 3840,
            basicInformation: {
                vendorName: "Vendorname",
                vendorId: VendorId(0xfff1),
                nodeLabel: "",
                productName: "Productname",
                productLabel: "Productlabel",
                productId: 0x8000,
                serialNumber: `node-matter`,
            },
            delayedAnnouncement: false,
        });

        this.onOffDevice.addFixedLabel("foo", "bar");
        this.onOffDevice.addFixedLabel("foo", "bar2");

        this.commissioningServer.addDevice(this.onOffDevice);

        return this.commissioningServer;
    }

    override async handleUserprompt(userPrompt: string, testDescription: string) {
        if (testDescription.includes("TH reads")) {
            return "y\n"; // We acknowledge the TH reads as checked
        }
        return super.handleUserprompt(userPrompt, testDescription);
    }
}