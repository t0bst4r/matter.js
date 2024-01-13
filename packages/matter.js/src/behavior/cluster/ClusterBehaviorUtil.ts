/**
 * @license
 * Copyright 2022-2023 Project CHIP Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Attribute } from "../../cluster/Cluster.js";
import { ClusterType } from "../../cluster/ClusterType.js";
import { ImplementationError, InternalError } from "../../common/MatterError.js";
import { AttributeModel, ClusterModel, ElementTag, FeatureSet, Matter, Metatype } from "../../model/index.js";
import { GeneratedClass } from "../../util/GeneratedClass.js";
import { EventEmitter, Observable } from "../../util/Observable.js";
import { camelize } from "../../util/String.js";
import { Behavior } from "../Behavior.js";
import { DerivedState } from "../state/StateType.js";
import { Schema } from "../supervision/Schema.js";
import type { ClusterBehavior } from "./ClusterBehavior.js";

/**
 * Create a non-functional instance of a {@link Behavior} for introspection
 * purposes.
 */
export function introspectionInstanceOf(type: Behavior.Type) {
    return new (type as unknown as new () => Record<string, Function>);
}

/**
 * This is the actual implementation of ClusterBehavior.for().  The result
 * must match {@link ClusterBehavior.Type}<C>.
 */
export function createType<const C extends ClusterType>(cluster: C, base: Behavior.Type, schema?: Schema) {
    const namesUsed = new Set<string>();

    if (!schema) {
        if (base.schema) {
            schema = base.schema;
        }
        if (!schema) {
            schema = schemaForCluster(cluster);
        }
    }

    return GeneratedClass({
        name: `${cluster.name}Behavior`,
        base,

        // These are really read-only but installing as getters on the
        // prototype prevents us from overriding using namespace overrides.  If
        // we instead override as static properties then we lose the automatic
        // interface type.  So just publish as static properties.
        staticProperties: {
            State: createDerivedState(cluster, schema, base, namesUsed),

            Events: createBaseEvents(cluster, namesUsed),
        },

        staticDescriptors: {
            id: {
                value: camelize(cluster.name) as Uncapitalize<string>,
                enumerable: true,
            },

            cluster: {
                value: cluster,
                enumerable: true,
            },

            schema: {
                value: schema,
            },
        },

        instanceDescriptors: createDefaultCommandDescriptors(cluster, base),
    });
}

/**
 * Utility to omit the generic "string" from a string record.
 *
 * We need this to enable ClusterBehavior.for on the base class where the
 * element objects otherwise have a generic string key that messes up
 * covariance.
 */
export type Named<O extends Record<string, any>> = {
    [K in string & keyof O as string extends K ? never : K]: O[K];
};

/**
 * The cluster type for a behavior.
 */
export type ClusterOf<B extends Behavior.Type> = InstanceType<B> extends { cluster: infer C extends ClusterType }
    ? C
    : ClusterType.Unknown;

/**
 * Create a new state subclass that inherits relevant default values from a
 * base Behavior.Type and adds new default values from cluster attributes.
 */
function createDerivedState(cluster: ClusterType, schema: Schema, base: Behavior.Type, namesUsed: Set<string>) {
    const BaseState = base["State"];
    if (BaseState === undefined) {
        throw new ImplementationError(`No state class defined for behavior class ${base.name}`);
    }

    const oldDefaults = new BaseState() as Record<string, any>;
    const statePrefix = `${camelize(cluster.name)}.state`;

    const newAttributes = {} as Record<string, ClusterType.Attribute>;
    for (const name in cluster.attributes) {
        const attribute = cluster.attributes[name];
        if (isGlobal(attribute)) {
            continue;
        }
        if (attribute.optional && !(name in oldDefaults)) {
            continue;
        }
        newAttributes[name] = attribute;
    }

    const oldAttributes = (base as ClusterBehavior.Type).cluster?.attributes ?? {};

    // Carry forward overrides that were not injected due to an attribute or
    // are applicable to the new attribute set.
    //
    // We will lose defaults for attributes that are removed then added, TBD if
    // this is an issue
    const defaults = {} as Record<string, any>;
    for (const name in oldDefaults) {
        if (oldAttributes[name] === undefined || newAttributes[name] !== undefined) {
            if (name in oldDefaults) {
                defaults[name] = oldDefaults[name];
            }
        }
    }

    // For each new attribute, inject the attribute's default if we don't have
    // an override, then inject a descriptor
    for (const name in newAttributes) {
        if (name in defaults) {
            continue;
        }
        defaults[name] = selectDefaultValue(
            cluster.attributes[name],
            schema.get(AttributeModel, camelize(name, true))
        );
    }

    for (const name in defaults) {
        if (namesUsed.has(name)) {
            throw new ImplementationError(`Conflicting definitions of property ${statePrefix}.${name}`);
        }
        namesUsed.add(name);
    }

    return DerivedState({
        name: `${cluster.name}$State`,
        base: base.State,
        values: defaults,
    });
}

function isGlobal(attribute: ClusterType.Attribute) {
    return attribute.id === 0xfe || (attribute.id >= 0xfff0 && attribute.id <= 0xffff);
}

/**
 * Extend events with additional implementations.
 */
function createBaseEvents(cluster: ClusterType, stateNames: Set<string>) {
    const names = new Set<string>();

    for (const name in cluster.events) {
        if (!cluster.events[name].optional) {
            names.add(name);
        }
    }
    for (const name of stateNames) {
        names.add(`${name}$Change`);
    }

    return GeneratedClass({
        name: `${cluster.name}$Events`,
        base: EventEmitter,

        initialize() {
            for (const name of names) {
                (this as any)[name] = Observable();
            }
        },
    });
}

/**
 * Obtain schema for a particular cluster.
 *
 * Currently we model TLV and TypeScript types with ClusterType and use
 * ClusterModel for logical operations.  This dual mode is not ideal but
 * necessary for the time being.
 *
 * This acts as an adapter to load the appropriate ClusterModel for a
 * ClusterType.
 */
function schemaForCluster(cluster: ClusterType) {
    let schema: ClusterModel | undefined;

    for (const child of Matter.children) {
        if (child.tag === ElementTag.Cluster && child.id === cluster.id) {
            schema = new ClusterModel(child);
            break;
        }
    }

    if (schema === undefined) {
        throw new InternalError(`Cannot locate schema for cluster ${cluster.id}, please supply manually`);
    }

    if (cluster.supportedFeatures.length) {
        schema = new ClusterModel({
            ...schema,
            supportedFeatures: new FeatureSet(cluster.supportedFeatures),
        });
    }

    return schema;
}

function createDefaultCommandDescriptors(cluster: ClusterType, base: Behavior.Type) {
    const result = {} as Record<string, PropertyDescriptor>;
    const instance = introspectionInstanceOf(base);

    for (const name in cluster.commands) {
        if (!instance[name]) {
            result[name] = {
                value: Behavior.unimplemented,
            }
        }
    }

    return result;
}

function selectDefaultValue(clusterAttr: Attribute<any, any>, schemaAttr?: AttributeModel) {
    if (clusterAttr.default) {
        return clusterAttr.default;
    }
    if (!schemaAttr?.conformance.mandatory) {
        return;
    }
    switch (schemaAttr.effectiveMetatype) {
        case Metatype.bitmap:
        case Metatype.object:
            // This is not a very good default but it is better than undefined
            return {};

        case Metatype.array:
            // Same
            return [];
    }
}
