/**
 * @license
 * Copyright 2022-2023 Project CHIP Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Metatype } from "../../../../model/definitions/index.js";
import type { RootSupervisor } from "../../../supervision/RootSupervisor.js";
import type { Schema } from "../../../supervision/Schema.js";
import { ValueSupervisor } from "../../../supervision/ValueSupervisor.js";
import { Val } from "../Val.js";
import { ListManager } from "./ListManager.js";
import { PrimitiveManager } from "./PrimitiveManager.js";
import { StructManager } from "./StructManager.js";

/**
 * Obtain a {@link ValueSupervisor.Manage} implementation for the given schema.
 *
 * Used by {@link RootSupervisor} which acts as a cache.
 */
export function ValueManager(schema: Schema, owner: RootSupervisor, base?: new () => Val): ValueSupervisor.Manage {
    switch (schema.effectiveMetatype) {
        case Metatype.object:
            return StructManager(owner, schema, base);

        case Metatype.array:
            return ListManager(owner, schema);

        // TODO - for completeness we should either make ByteArray immutable
        // in state or wrap here but meh

        default:
            return PrimitiveManager;
    }
}