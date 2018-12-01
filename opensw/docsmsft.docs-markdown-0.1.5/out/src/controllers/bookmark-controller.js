"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const common_1 = require("../helper/common");
const utility_1 = require("../helper/utility");
const telemetry_1 = require("../telemetry/telemetry");
const telemetryCommand = "insertBookmark";
const markdownExtensionFilter = [".md"];
exports.headingTextRegex = /^ {0,3}(#{2,6})(.*)/gm;
exports.yamlTextRegex = /^-{3}\s*\r?\n([\s\S]*?)-{3}\s*\r?\n([\s\S]*)/;
function insertBookmarkCommands() {
    const commands = [
        { command: insertBookmarkExternal.name, callback: insertBookmarkExternal },
        { command: insertBookmarkInternal.name, callback: insertBookmarkInternal },
    ];
    return commands;
}
exports.insertBookmarkCommands = insertBookmarkCommands;
/**
 * Creates a bookmark to another file at the cursor position
 */
function insertBookmarkExternal() {
    telemetry_1.reporter.sendTelemetryEvent("command", { command: telemetryCommand + ".external" });
    // Modules used to access file system
    const path = require("path");
    const dir = require("node-dir");
    const os = require("os");
    const fs = require("fs");
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        common_1.noActiveEditorMessage();
        return;
    }
    const activeFileName = editor.document.fileName;
    const activeFilePath = path.dirname(activeFileName);
    // Check to see if the active file has been saved.  If it has not been saved, warn the user.
    // The user will still be allowed to add a link but it the relative path will not be resolved.
    const fileExists = require("file-exists");
    if (!fileExists(activeFileName)) {
        vscode.window.showWarningMessage(`${activeFilePath} is not saved.  Cannot accurately resolve path to create link.`);
        return;
    }
    const folderPath = vscode.workspace.rootPath;
    // recursively get all the files from the root folder
    dir.files(folderPath, (err, files) => {
        if (err) {
            vscode.window.showErrorMessage(err);
            throw err;
        }
        const items = [];
        files.sort();
        files.filter((file) => markdownExtensionFilter.indexOf(path.extname(file.toLowerCase())) !== -1).forEach((file) => {
            items.push({ label: path.basename(file), description: path.dirname(file) });
        });
        // show the quick pick menu
        const selectionPick = vscode.window.showQuickPick(items);
        selectionPick.then((qpSelection) => {
            let result = "";
            let bookmark = "";
            // gets the content for chosen file with utf-8 format
            let fullPath;
            if (!qpSelection) {
                return;
            }
            if (os.type() === "Windows_NT") {
                fullPath = qpSelection.description + "\\" + qpSelection.label;
            }
            else {
                fullPath = qpSelection.description + "//" + qpSelection.label;
            }
            const content = fs.readFileSync(fullPath, "utf8");
            const headings = content.match(exports.headingTextRegex);
            if (!headings) {
                vscode.window.showErrorMessage("No headings found in file, cannot insert bookmark!");
                return;
            }
            const adjustedHeadingsItems = [];
            const adjustedHeadings = utility_1.addbookmarkIdentifier(headings);
            adjustedHeadings.forEach((adjustedHeading) => {
                adjustedHeadingsItems.push({ label: adjustedHeading, detail: " " });
            });
            vscode.window.showQuickPick(adjustedHeadingsItems).then((headingSelection) => {
                if (!headingSelection) {
                    return;
                }
                if (path.resolve(activeFilePath) === path.resolve(qpSelection.label.split("\\").join("\\\\")) && path.basename(activeFileName) === qpSelection.label) {
                    bookmark = utility_1.bookmarkBuilder(editor.document.getText(editor.selection), headingSelection.label, "");
                }
                else {
                    if (os.type() === "Windows_NT") {
                        result = path.relative(activeFilePath, path.join(qpSelection.description, qpSelection.label).split("\\").join("\\\\"));
                    }
                    else {
                        result = path.relative(activeFilePath, path.join(qpSelection.description, qpSelection.label).split("//").join("//"));
                    }
                    bookmark = utility_1.bookmarkBuilder(editor.document.getText(editor.selection), headingSelection.label, result);
                }
                common_1.insertContentToEditor(editor, "InsertBookmarkExternal", bookmark, true, editor.selection);
            });
        });
    });
}
exports.insertBookmarkExternal = insertBookmarkExternal;
/**
 * Creates a bookmark at the current cursor position
 */
function insertBookmarkInternal() {
    telemetry_1.reporter.sendTelemetryEvent("command", { command: telemetryCommand + ".internal" });
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    const content = editor.document.getText();
    const headings = content.match(exports.headingTextRegex);
    if (!headings) {
        vscode.window.showErrorMessage("No headings found in file, cannot insert bookmark!");
        return;
    }
    // put number to duplicate names in position order
    const adjustedHeadings = utility_1.addbookmarkIdentifier(headings);
    const adjustedHeadingsItems = [];
    adjustedHeadings.forEach((heading) => {
        adjustedHeadingsItems.push({ label: heading, detail: " " });
    });
    vscode.window.showQuickPick(adjustedHeadingsItems).then((headingSelection) => {
        if (!headingSelection) {
            return;
        }
        const bookmark = utility_1.bookmarkBuilder(editor.document.getText(editor.selection), headingSelection.label, "");
        common_1.insertContentToEditor(editor, "InsertBookmarkInternal", bookmark, true, editor.selection);
    });
}
exports.insertBookmarkInternal = insertBookmarkInternal;
//# sourceMappingURL=bookmark-controller.js.map