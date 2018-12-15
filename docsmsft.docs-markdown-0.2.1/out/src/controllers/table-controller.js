"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const extension_1 = require("../extension");
const common_1 = require("../helper/common");
const utility_1 = require("../helper/utility");
const telemetry_1 = require("../telemetry/telemetry");
const telemetryCommand = "insertTable";
function insertTableCommand() {
    const commands = [
        { command: insertTable.name, callback: insertTable },
    ];
    return commands;
}
exports.insertTableCommand = insertTableCommand;
function insertTable() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        common_1.noActiveEditorMessage();
        return;
    }
    if (!common_1.isValidEditor(editor, false, insertTable.name)) {
        return;
    }
    if (!common_1.isMarkdownFileCheck(editor, false)) {
        return;
    }
    const tableInput = vscode.window.showInputBox({ prompt: "행과 열의 형식을 (행:열)과 같이 입력하기(ex. 1:2)" });
    // gets the users input on number of columns and rows
    tableInput.then((val) => {
        if (!val) {
            return;
        }
        else {
            const size = val.split(":");
            /// check valid value and exceed 4*4
            if (utility_1.validateTableRowAndColumnCount(size.length, size[0], size[1])) {
                const col = Number.parseInt(size[0]);
                const row = Number.parseInt(size[1]);
                const str = utility_1.tableBuilder(col, row);
                const logTableMessage = "." + col + ":" + row;
                telemetry_1.reporter.sendTelemetryEvent("command", { command: telemetryCommand + logTableMessage });
                common_1.insertContentToEditor(editor, insertTable.name, str);
            }
            else {
                extension_1.output.appendLine("테이블 삽입 실패");
            }
        }
    });
}
exports.insertTable = insertTable;
//# sourceMappingURL=table-controller.js.map