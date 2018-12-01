"use-strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
/**
 * Create a posted warning message and applies the message to the log
 * @param {string} message - the message to post to the editor as an warning.
 */
function postWarning(message) {
    debug(message);
    vscode.window.showWarningMessage(message);
}
exports.postWarning = postWarning;
/**
 * Create a posted information message and applies the message to the log
 * @param {string} message - the message to post to the editor as an information.
 */
function postInformation(message) {
    debug(message);
    vscode.window.showInformationMessage(message);
}
exports.postInformation = postInformation;
/**
 * Create a posted information message and applies the message to the log
 * @param {string} message - the message to post to the editor as an information.
 */
function postError(message) {
    debug(message);
    vscode.window.showErrorMessage(message);
}
exports.postError = postError;
function hasValidWorkSpaceRootPath(senderName) {
    const folderPath = vscode.workspace.rootPath;
    if (folderPath == null) {
        postWarning("The " + senderName + " command requires an active workspace. Please open VS Code from the root of your clone to continue.");
        return false;
    }
    return true;
}
exports.hasValidWorkSpaceRootPath = hasValidWorkSpaceRootPath;
/**
 * Provides a common tool for logging. Currently prints to the console (when debugging), and nothing else.
 * @param {any} message - the object to be written to the log. This does not strictly require string type.
 */
function debug(message) {
    process.stdout.write(message + "\n");
}
exports.debug = debug;
/**
 * Create timestamp
 */
function generateTimestamp() {
    const date = new Date(Date.now());
    return {
        msDateValue: date.toLocaleDateString("en-us"),
        msTimeValue: date.toLocaleTimeString([], { hour12: false }),
    };
}
exports.generateTimestamp = generateTimestamp;
//# sourceMappingURL=common.js.map