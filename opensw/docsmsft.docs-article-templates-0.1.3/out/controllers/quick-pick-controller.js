"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const dir = require("node-dir");
const path = require("path");
const vscode = require("vscode");
const extension_1 = require("../extension");
const common = require("../helper/common");
const github_1 = require("../helper/github");
const metadata = require("../helper/user-metadata");
const markdownExtensionFilter = [".md"];
const editor = vscode.window.activeTextEditor;
function showTemplates() {
    return __awaiter(this, void 0, void 0, function* () {
        // create a new markdown file.
        const newFile = vscode.Uri.parse("untitled:" + "New-Topic.md");
        // parse the repo directory for markdown files, sort them and push them to the quick pick menu.
        vscode.workspace.openTextDocument(newFile).then((textDocument) => {
            vscode.window.showTextDocument(textDocument, 1, false).then((textEditor) => {
                dir.files(github_1.templateDirectory, (err, files) => {
                    if (err) {
                        extension_1.output.appendLine(err);
                        throw err;
                    }
                    const items = [];
                    files.sort();
                    {
                        files.filter((file) => markdownExtensionFilter.indexOf(path.extname(file.toLowerCase()))
                            !== -1).forEach((file) => {
                            if (path.basename(file).toLowerCase() !== "readme.md") {
                                items.push({ label: path.basename(file), description: path.dirname(file) });
                            }
                        });
                    }
                    vscode.window.showQuickPick(items).then((qpSelection) => {
                        if (!qpSelection) {
                            return;
                        }
                        else {
                            const qpFullPath = path.join(qpSelection.description, qpSelection.label);
                            const content = fs.readFileSync(qpFullPath, "utf8");
                            textEditor.edit((edit) => {
                                let updatedContent;
                                const { msDateValue } = common.generateTimestamp();
                                // replace metadata placeholder values with user settings and dynamic values then write template content to new file.
                                if (!metadata.gitHubID && !metadata.alias) {
                                    updatedContent = content.replace("{@date}", msDateValue).replace("{github-id}", metadata.missingValue).replace("{ms-alias}", metadata.missingValue);
                                    edit.insert(new vscode.Position(0, 0), updatedContent);
                                }
                                else if (!metadata.gitHubID) {
                                    updatedContent = content.replace("{@date}", msDateValue).replace("{github-id}", metadata.missingValue).replace("{ms-alias}", metadata.alias);
                                    edit.insert(new vscode.Position(0, 0), updatedContent);
                                }
                                else if (!metadata.alias) {
                                    updatedContent = content.replace("{@date}", msDateValue).replace("{github-id}", metadata.gitHubID).replace("{ms-alias}", metadata.missingValue);
                                    edit.insert(new vscode.Position(0, 0), updatedContent);
                                }
                                else {
                                    updatedContent = content.replace("{@date}", msDateValue).replace("{github-id}", metadata.gitHubID).replace("{ms-alias}", metadata.alias);
                                    edit.insert(new vscode.Position(0, 0), updatedContent);
                                }
                            });
                        }
                    }, (error) => {
                        vscode.window.showWarningMessage(error);
                        extension_1.output.appendLine(error);
                    });
                });
            });
        });
        github_1.cleanupDownloadFiles();
    });
}
exports.showTemplates = showTemplates;
//# sourceMappingURL=quick-pick-controller.js.map