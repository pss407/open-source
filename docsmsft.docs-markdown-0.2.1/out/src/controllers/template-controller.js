"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const common_1 = require("../helper/common");
const telemetry_1 = require("../telemetry/telemetry");
const telemetryCommand = "applyTemplate";
function applyTemplateCommand() {
    const commands = [
        { command: applyTemplate.name, callback: applyTemplate },
    ];
    return commands;
}
exports.applyTemplateCommand = applyTemplateCommand;
function applyTemplate() {
    telemetry_1.reporter.sendTelemetryEvent("command", { command: telemetryCommand });
    const extensionName = "docsmsft.docs-article-templates";
    const { msTimeValue } = common_1.generateTimestamp();
    const friendlyName = "docsmsft.docs-article-templates".split(".").reverse()[0];
    const inactiveMessage = `[${msTimeValue}] - The ${friendlyName} extension is not installed.`;
    if (common_1.checkExtension(extensionName, inactiveMessage)) {
        vscode.commands.executeCommand("applyTemplate");
    }
}
exports.applyTemplate = applyTemplate;
//# sourceMappingURL=template-controller.js.map