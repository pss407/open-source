"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const alert_tags_1 = require("../constants/alert-tags");
const common_1 = require("../helper/common");
const telemetry_1 = require("../telemetry/telemetry");
const telemetryCommand = "insertAlert";
function insertAlertCommand() {
    const commands = [
        { command: insertAlert.name, callback: insertAlert },
    ];
    return commands;
}
exports.insertAlertCommand = insertAlertCommand;
/**
 * Formats current selection as an alert
 */
function insertAlert() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        common_1.noActiveEditorMessage();
        return;
    }
    else {
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        let formattedText;
        if (!common_1.isMarkdownFileCheck(editor, false)) {
            return;
        }
        const alertTypes = [
            "Note – 스킵 시 사용자가 가져서는 안 되는 정보",
            "Tip - 사용자의 성공에 도움이 되는 선택적 정보",
            "Important – 사용자 성공을 위해 필요한 필수 정보",
            "Caution - 조치 시 부정적인 잠재적 결과",
            "Warning – 조치 시 위험한 특정 결과",
        ];
        vscode.window.showQuickPick(alertTypes).then((qpSelection) => {
            if (!qpSelection) {
                return;
            }
            else {
                formattedText = format(selectedText, alertTypes.indexOf(qpSelection));
            }
            if (editor) {
                common_1.insertContentToEditor(editor, insertAlert.name, formattedText, true);
                if (qpSelection.startsWith("Note")) {
                    telemetry_1.reporter.sendTelemetryEvent("command", { command: telemetryCommand + ".note" });
                }
                if (qpSelection.startsWith("Tip")) {
                    telemetry_1.reporter.sendTelemetryEvent("command", { command: telemetryCommand + ".tip" });
                }
                if (qpSelection.startsWith("Important")) {
                    telemetry_1.reporter.sendTelemetryEvent("command", { command: telemetryCommand + ".important" });
                }
                if (qpSelection.startsWith("Caution")) {
                    telemetry_1.reporter.sendTelemetryEvent("command", { command: telemetryCommand + ".caution" });
                }
                if (qpSelection.startsWith("Warning")) {
                    telemetry_1.reporter.sendTelemetryEvent("command", { command: telemetryCommand + ".warning" });
                }
            }
        });
    }
}
exports.insertAlert = insertAlert;
/**
 *  Returns input string formatted as the alert type
 * If input string is an alert of the same type as alertType, it removes the formatting
 * If input string is an alert of different type than alertType
 * It formats the original string as the new alert type
 * @param {string} content - selectedText
 * @param {enum} alertType - type of alert - Note, Important, Warning, Tip
 */
function format(content, alertType) {
    const alertPlaceholderText = [
        "Information the user should notice even if skimming",
        "Optional information to help a user be more successful",
        "Essential information required for user success",
        "Negative potential consequences of an action",
        "Dangerous certain consequences of an action",
    ];
    let selectedText = content;
    if (isAlert(content)) {
        if (getAlertType(content) === alertType) {
            // split the text into paragraphs,
            // remove formatting from each paragraph,
            // remove the first item (which contains the alert type)
            const paragraphsAlert = selectedText.split("\r\n").map((text) => text.substring(2)).slice(1);
            return paragraphsAlert.join("\r\n");
        }
        else {
            // split the text into paragraphs and remove the first item (which contains the alert type)
            const paragraphsGeneric = selectedText.split("\r\n").slice(1);
            const resultParagraphsGeneric = alert_tags_1.AlertTags[alertType] + paragraphsGeneric.join("\r\n");
            return resultParagraphsGeneric;
        }
    }
    if (selectedText.length === 0) {
        selectedText = alertPlaceholderText[alertType];
    }
    // split the text into paragraphs and format each paragraph
    const paragraphs = selectedText.split("\r\n").map((text) => "> " + text);
    const result = alert_tags_1.AlertTags[alertType] + paragraphs.join("\r\n");
    return result;
}
exports.format = format;
/**
 * Returns the alert type
 * @param {string} content - the string content
 * @return {AlertType} - the type of alert i.e. Note, Warning, Important, Tip
 */
function getAlertType(content) {
    return alert_tags_1.AlertTags.findIndex((tag) => content.startsWith(tag));
}
exports.getAlertType = getAlertType;
/**
 * Checks if the string input is a valid alert
 * @param {string} content - the string content
 * @return {boolean} - true/false the content is an alert
 */
function isAlert(content) {
    // Check if the content starts with an alert tag and if all paragraphs contain the ">" formatter
    if ((alert_tags_1.AlertTags.some((tag) => content.startsWith(tag))) &&
        (content.split("\n").every((line) => line.startsWith(">")))) {
        return true;
    }
    else {
        return false;
    }
}
exports.isAlert = isAlert;
//# sourceMappingURL=alert-controller.js.map