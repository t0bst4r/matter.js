/**
 * @license
 * Copyright 2022-2023 Project CHIP Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { GlobalAttributes } from "../../cluster/Cluster.js";
import { ClusterType } from "../../cluster/ClusterType.js";
import { ImplementationError } from "../../common/MatterError.js";
import { Diagnostic } from "../../log/Diagnostic.js";
import { Logger } from "../../log/Logger.js";
import { Observable } from "../../util/Observable.js";
import { Behavior } from "../Behavior.js";
import { ClusterBehavior } from "./ClusterBehavior.js";
import { introspectionInstanceOf } from "./ClusterBehaviorUtil.js";

const logger = Logger.get("ValidatedElements");

const GlobalAttributeNames = new Set(Object.keys(GlobalAttributes({})));

/**
 * Analyzes a ClusterBehavior implementation to ensure it conforms to the
 * Matter specification.
 *
 * As this API is accessible via vanilla JavaScript, validation includes tests
 * for errors that TypeScript otherwise prevents.
 *
 * Records elements supported and a list of errors if validation fails.
 */
export class ValidatedElements {
    /**
     * Supported attributes.
     */
    attributes = new Set<string>();

    /**
     * Supported commands.
     */
    commands = new Set<string>();

    /**
     * Supported events.
     */
    events = new Set<string>();

    /**
     * A list of implementation errors, if any.
     */
    errors?: { element: string; message: string, fatal: boolean }[];

    #name: string;
    #type: Behavior.Type;
    #cluster: ClusterType;

    constructor(type: ClusterBehavior.Type) {
        this.#type = type;
        this.#name = type.name;
        this.#cluster = type.cluster;

        if (typeof type !== "function") {
            this.error(undefined, "Is not a class", true);            
        }
        if (this.#cluster === undefined) {
            this.error("cluster", "Property missing", true);
            return;
        }
        if (typeof this.#cluster !== "object") {
            this.error("cluster", "Property is not an object", true);
            return;
        }

        this.#validateAttributes();
        this.#validateCommands();
        this.#validateEvents();
    }

    /**
     * If there are errors, log and throw an exception.
     */
    report() {
        if (!this.errors) {
            return;
        }

        let incapacitated = false;

        for (const error of this.errors) {
            const diagnostic = Diagnostic.squash(
                "in ",
                Diagnostic.strong(error.element),
                ": ",
                error.message,
            );

            if (error.fatal) {
                incapacitated = true;
                logger.error("Error", diagnostic);
            } else {
                logger.info("Non-fatal error", diagnostic);
            }
        }

        if (incapacitated) {
            throw new ImplementationError(
                `There ${
                    this.errors.length > 1 ? `are ${this.errors.length} errors` : `is 1 error`
                } in a ClusterBehavior implementation for property ${this.#name} (see log for details)`,
            );
        }
    }

    #validateAttributes() {
        const attributes = this.#cluster.attributes;
        if (!attributes) {
            this.error("cluster.attributes", "Property missing", true);
            return;
        }

        const constructor = this.#type.State;
        if (!constructor) {
            this.error("State", "Property missing", true);
            return;
        }

        let defaults;
        try {
            defaults = new constructor();
        } catch (e) {
            this.error("State", "Not constructable", true);
            return;
        }

        if (!defaults) {
            this.error("State", "Implementation missing", true);
            return;
        }

        for (const name in attributes) {
            // Global attributes currently handled in lower-level code
            if (GlobalAttributeNames.has(name)) {
                continue;
            }

            const attr = attributes[name];
            if (!attr) {
                this.error(`cluster.attributes.${name}`, "Undefined element in cluster definition", true);
                continue;
            }

            if (!(name in defaults)) {
                if (!attr.optional) {
                    this.error(`State.${name}`, "Mandatory element unsupported", false);
                }
                // This error does not incapacitate the endpoint
            }

            this.attributes.add(name);

            // TODO - should we enforce presence of events.<attr>$Change?

            // TODO - validate "optional but not nullable" if attributes get
            // proper metadata (or go to model for this)
        }
    }

    #validateCommands() {
        const commands = this.#cluster.commands;
        if (!commands) {
            this.error("cluster.commands", "Property missing", true);
            return;
        }

        let implementations;
        try {
            implementations = introspectionInstanceOf(this.#type);
        } catch (e) {
            this.error("constructor", "Not constructable", true);
            return;
        }

        for (const name in commands) {
            const command = commands[name];
            if (!command) {
                this.error(`cluster.commands.${name}`, "Undefined element in cluster definition", true);
                continue;
            }

            if (!(name in implementations) || implementations[name] === undefined) {
                if (!command.optional) {
                    this.error(name, `Implementation missing`, true);
                }
                continue;
            }

            if (typeof implementations[name] !== "function") {
                this.error(name, `Implementation is not a function`, true);
                continue;
            }

            if (implementations[name] === Behavior.unimplemented) {
                this.error(name, `Throws unimplemented exception`, false);
                // This error does not incapacitate the endpoint
            }

            this.commands.add(name);
        }
    }

    #validateEvents() {
        const expected = this.#cluster.events;
        if (typeof expected !== "object" || expected === null) {
            this.error("cluster.events", "Invalid definition", true);
            return;
        }

        const constructor = this.#type.Events;
        if (!constructor) {
            this.error("Events", "Implementation missing", true);
            return;
        }

        let emitters;
        try {
            emitters = new constructor() as unknown as  Record<string, Observable>;
        } catch (e) {
            this.error("Events", "Not constructable", true);
            return;
        }

        for (const name in expected) {
            const event = expected[name];
            if (!event) {
                this.error(`cluster.events.${name}`, "Undefined element in cluster definition", true);
                continue;
            }

            if (!(name in emitters)) {
                if (!event.optional) {
                    this.error(`cluster.events.${name}`, "Implementation missing", true);
                }
                continue;
            }

            this.events.add(name);
        }
    }

    private error(element: string | undefined, message: string, fatal: boolean) {
        if (!this.errors) {
            this.errors = [];
        }
        const name = element === undefined ? this.#name : `${this.#name}.${element}`;

        this.errors?.push({ element: name, message, fatal });
    }
}