"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dir = require("node-dir");
const vscode = require("vscode");
const common_1 = require("../helper/common");
const utility_1 = require("../helper/utility");
const telemetry_1 = require("../telemetry/telemetry");
const telemetryCommand = "insertSnippet";
// let dir = require("node-dir");
function insertSnippetCommand() {
    const commands = [
        { command: insertSnippet.name, callback: insertSnippet },
    ];
    return commands;
}
exports.insertSnippetCommand = insertSnippetCommand;
/**
 * Creates a snippet at the current cursor position.
 */
function insertSnippet() {
    telemetry_1.reporter.sendTelemetryEvent("command", { command: telemetryCommand });
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        common_1.noActiveEditorMessage();
        return;
    }
    if (!common_1.isValidEditor(editor, false, insertSnippet.name)) {
        return;
    }
    if (!common_1.isMarkdownFileCheck(editor, false)) {
        return;
    }
    if (!common_1.hasValidWorkSpaceRootPath(telemetryCommand)) {
        return;
    }
    vscode.window.showInputBox({ prompt: "Snippet 검색어 입력" }).then(searchRepo);
}
exports.insertSnippet = insertSnippet;
// finds the directories to search, passes this and the search term to the search function.
function searchRepo(searchTerm) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        common_1.noActiveEditorMessage();
        return;
    }
    const folderPath = vscode.workspace.rootPath;
    const selected = editor.selection;
    // There are two kinds of repo searching, whole repo, and scoped folder (both recursive)
    const scopeOptions = [];
    scopeOptions.push({ label: "전체 검색", description: "모든 디렉토리에서 snippet을 찾습니다." });
    scopeOptions.push({ label: "범위 검색", description: "특정 디렉토리에서 snippet을 찾습니다." });
    vscode.window.showQuickPick(scopeOptions).then(function searchType(selection) {
        if (!selection) {
            return;
        }
        const searchSelection = selection.label;
        if (searchSelection === "전체 검색") {
            utility_1.search(editor, selected, searchTerm, folderPath);
        }
        else {
            // gets all subdirectories to populate the scope search function.
            dir.subdirs(folderPath, (err, subdirs) => {
                if (err) {
                    vscode.window.showErrorMessage(err);
                    throw err;
                }
                const dirOptions = [];
                for (const folders in subdirs) {
                    if (subdirs.hasOwnProperty(folders)) {
                        dirOptions.push({ label: subdirs[folders], description: "sub directory" });
                    }
                }
            });
        }
    });
}
exports.searchRepo = searchRepo;
//# sourceMappingURL=snippet-controller.js.map