/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */
import { Ble } from "@project-chip/matter.js/ble";
import { ImplementationError } from "@project-chip/matter.js/common";
import { BleScanner } from "./BleScanner.js";
import { ReactNativeBleCentralInterface } from "./ReactNativeBleChannel.js";
import { ReactNativeBleClient } from "./ReactNativeBleClient.js";
class BleReactNative extends Ble {
  constructor() {
    super();
  }
  getBleCentralInterface() {
    if (this.bleCentral === void 0) {
      this.bleCentral = new ReactNativeBleClient();
    }
    return new ReactNativeBleCentralInterface();
  }
  getBleScanner() {
    if (this.bleCentral === void 0) {
      this.bleCentral = new ReactNativeBleClient();
    }
    return new BleScanner(this.bleCentral);
  }
  getBlePeripheralInterface() {
    throw new ImplementationError("React Native can only act as a central device, not a peripheral.");
  }
  getBleBroadcaster() {
    throw new ImplementationError("React Native can only act as a central device, not a broadcaster.");
  }
}
export {
  BleReactNative
};
//# sourceMappingURL=BleReactNative.js.map
