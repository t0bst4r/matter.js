/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

// Note - we don't import mocha here because in the browser we load their standard browser bundle which is different
// from the Node version

import Chai from "chai";
import ChaiAsPromised from "chai-as-promised";
import { browserSetup, generalSetup } from "./mocha.js";
import { bootSetup } from "./mocks/boot.js";
import { cryptoSetup } from "./mocks/crypto.js";
import { TheMockLogger, loggerSetup } from "./mocks/logging.js";
import { timeSetup } from "./mocks/time.js";

Chai.config.truncateThreshold = 200;
Chai.use(ChaiAsPromised);

Object.assign(globalThis, {
    expect: Chai.expect,

    MatterHooks: {
        bootSetup,
        loggerSetup,
        timeSetup,
        cryptoSetup,
    },

    MockLogger: TheMockLogger,
});

if (typeof window === "object" && globalThis === window) {
    generalSetup(mocha);
    browserSetup(mocha);
}