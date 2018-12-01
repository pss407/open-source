"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const common_1 = require("../helper/common");
const telemetry_1 = require("../telemetry/telemetry");
const telemetryCommand = "previewTopic";
function previewTopicCommand() {
    const commands = [
        { command: previewTopic.name, callback: previewTopic },
    ];
    return commands;
}
exports.previewTopicCommand = previewTopicCommand;
function previewTopic() {
    telemetry_1.reporter.sendTelemetryEvent("command", { command: telemetryCommand });
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        common_1.noActiveEditorMessage();
        return;
    }
    else {
        if (!common_1.isValidEditor(editor, false, "preview topic")) {
            return;
        }
        if (!common_1.isMarkdownFileCheck(editor, false)) {
            return;
        }
        const osPlatform = common_1.getOSPlatform();
        const extensionName = "docsmsft.docs-preview";
        const { msTimeValue } = common_1.generateTimestamp();
        const friendlyName = "docsmsft.docs-preview".split(".").reverse()[0];
        const inactiveMessage = `[${msTimeValue}] - The ${friendlyName} extension is not installed.`;
        if (common_1.checkExtension(extensionName, inactiveMessage)) {
            if (osPlatform === "linux") {
                vscode.commands.executeCommand("markdown.showPreviewToSide");
            }
            else {
                vscode.commands.executeCommand("docs.showPreviewToSide");
            }
        }
    }
}
exports.previewTopic = previewTopic;
//# sourceMappingURL=preview-controller.js.map