/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Metatype } from "../common/index.js";
import { DatatypeElement } from "../elements/DatatypeElement.js";
import { Model } from "./Model.js";
import { ValueModel } from "./ValueModel.js";

export class DatatypeModel extends ValueModel<DatatypeElement> implements DatatypeElement {
    override tag: DatatypeElement.Tag = DatatypeElement.Tag;
    declare id: undefined;

    get definesFields() {
        switch (this.effectiveMetatype) {
            case Metatype.object:
            case Metatype.enum:
            case Metatype.bitmap:
                return !!this.definingModel?.children.length;
        }
        return false;
    }

    static {
        Model.types[DatatypeElement.Tag] = this;
    }
}
const x = {} as DatatypeModel;
x.children;
