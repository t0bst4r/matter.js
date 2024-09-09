/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { FieldValue } from "../common/index.js";

/**
 * A single token for the parser.
 */
export interface Token {
    type: string;
    startLine: number;
    startChar: number;
}

/**
 * The base token produced by the tokenizer.
 */
export type BasicToken = BasicToken.Special | BasicToken.Word | BasicToken.Number;

/**
 * A {@link BasicToken} with additional keywords.
 */
export type ExtendedToken<K extends string> = BasicToken | (Token & { type: K[number] });

export namespace BasicToken {
    export type Operator =
        | "!"
        | "=="
        | "!="
        | "|"
        | "^"
        | "&"
        | "."
        | ","
        | "["
        | "]"
        | "("
        | ")"
        | "-"
        | "+"
        | "*"
        | "/"
        | ">"
        | "<"
        | ">="
        | "<=";

    export interface Special extends Token {
        type: Operator;
    }

    export interface Word extends Token {
        type: "word";
        value: string;
    }

    export interface Number extends Token {
        type: "value";
        value: FieldValue;
    }
}
