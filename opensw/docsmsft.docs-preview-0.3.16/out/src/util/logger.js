"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
let Subscriber;
function SubscribeToAllLoggers(subscriber) {
    Subscriber = subscriber;
}
exports.SubscribeToAllLoggers = SubscribeToAllLoggers;
class Logger {
    constructor(writer, prefix) {
        this.indentLevel = 0;
        this.indentSize = 4;
        this.atLineStart = false;
        this.writer = writer;
        this.prefix = prefix;
    }
    increaseIndent() {
        this.indentLevel += 1;
    }
    decreaseIndent() {
        if (this.indentLevel > 0) {
            this.indentLevel -= 1;
        }
    }
    append(message) {
        message = message || "";
        this._appendCore(message);
    }
    appendLine(message) {
        message = message || "";
        this._appendCore(message + "\n");
        this.atLineStart = true;
    }
    _appendCore(message) {
        if (this.atLineStart) {
            if (this.indentLevel > 0) {
                const indent = " ".repeat(this.indentLevel * this.indentSize);
                this.write(indent);
            }
            if (this.prefix) {
                this.write(`[${this.prefix}] `);
            }
            this.atLineStart = false;
        }
        this.write(message);
    }
    write(message) {
        this.writer(message);
        if (Subscriber) {
            Subscriber(message);
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map