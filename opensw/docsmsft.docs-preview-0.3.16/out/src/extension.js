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
const path = require("path");
const vscode_1 = require("vscode");
const provider_1 = require("./provider");
const server_1 = require("./server");
const util = require("./util/common");
const logger_1 = require("./util/logger");
let channel = null;
let server = null;
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const extensionId = "docsmsft.docs-preview";
        const extension = vscode_1.extensions.getExtension(extensionId);
        util.setExtensionPath(extension.extensionPath);
        channel = vscode_1.window.createOutputChannel("docs-preview");
        const logger = new logger_1.Logger((text) => channel.append(text));
        server = new server_1.MarkdocsServer(context);
        const provider = new provider_1.DocumentContentProvider(context);
        yield server.ensureRuntimeDependencies(extension, channel, logger);
        yield server.startMarkdocsServerAsync();
        const registration = vscode_1.workspace.registerTextDocumentContentProvider(provider_1.DocumentContentProvider.scheme, provider);
        const disposableSidePreview = vscode_1.commands.registerCommand("docs.showPreviewToSide", (uri) => {
            preview(uri, vscode_1.ViewColumn.Two, provider);
        });
        const disposableStandalonePreview = vscode_1.commands.registerCommand("docs.showPreview", (uri) => {
            preview(uri, vscode_1.ViewColumn.One, provider);
        });
        const disposableDidClick = vscode_1.commands.registerCommand("docs.didClick", (uri, line) => {
            click(uri, line);
        });
        const disposableRevealLink = vscode_1.commands.registerCommand("docs.revealLine", (uri, line) => {
            reveal(uri, line);
        });
        context.subscriptions.push(disposableSidePreview, disposableStandalonePreview, disposableDidClick, disposableRevealLink, registration);
        context.subscriptions.push(vscode_1.workspace.onDidChangeTextDocument((event) => {
            if (provider_1.isMarkdownFile(event.document)) {
                const uri = getPreviewUri(event.document.uri);
                provider.update(uri);
            }
        }));
        context.subscriptions.push(vscode_1.workspace.onDidSaveTextDocument((document) => {
            if (provider_1.isMarkdownFile(document)) {
                const uri = getPreviewUri(document.uri);
                provider.update(uri);
            }
        }));
        context.subscriptions.push(vscode_1.window.onDidChangeTextEditorSelection((event) => {
            if (provider_1.isMarkdownFile(event.textEditor.document)) {
                const markdownFile = getPreviewUri(event.textEditor.document.uri);
                vscode_1.commands.executeCommand("_workbench.htmlPreview.postMessage", markdownFile, {
                    line: event.selections[0].active.line,
                });
            }
        }));
    });
}
exports.activate = activate;
function deactivate() {
    return server.stopMarkdocsServerAsync();
}
exports.deactivate = deactivate;
function getPreviewUri(uri) {
    if (uri.scheme === provider_1.DocumentContentProvider.scheme) {
        return uri;
    }
    return uri.with({
        path: uri.fsPath + ".rendered",
        query: uri.toString(),
        scheme: provider_1.DocumentContentProvider.scheme,
    });
}
function preview(uri, viewColumn, provider) {
    if (vscode_1.window.activeTextEditor) {
        uri = uri || vscode_1.window.activeTextEditor.document.uri;
    }
    if (!uri) {
        return;
    }
    const previewUri = getPreviewUri(uri);
    provider.update(previewUri);
    return vscode_1.commands.executeCommand("vscode.previewHtml", previewUri, viewColumn, `view ${path.basename(uri.fsPath)}`);
}
function click(uri, line) {
    const sourceUri = vscode_1.Uri.parse(decodeURIComponent(uri));
    return vscode_1.workspace.openTextDocument(sourceUri)
        .then((document) => vscode_1.window.showTextDocument(document))
        .then((editor) => vscode_1.commands.executeCommand("revealLine", { lineNumber: Math.floor(line), at: "center" })
        .then(() => editor))
        .then((editor) => {
        if (editor) {
            editor.selection = new vscode_1.Selection(new vscode_1.Position(Math.floor(line), 0), new vscode_1.Position(Math.floor(line), 0));
        }
    });
}
function reveal(uri, line) {
    const sourceUri = vscode_1.Uri.parse(decodeURIComponent(uri));
    vscode_1.window.visibleTextEditors
        .filter((editor) => provider_1.isMarkdownFile(editor.document) && editor.document.uri.toString() === sourceUri.toString())
        .forEach((editor) => {
        const sourceLine = Math.floor(line);
        const fraction = line - sourceLine;
        const text = editor.document.lineAt(sourceLine).text;
        const start = Math.floor(fraction * text.length);
        editor.revealRange(new vscode_1.Range(sourceLine, start, sourceLine + 1, 0), vscode_1.TextEditorRevealType.AtTop);
    });
}
//# sourceMappingURL=extension.js.map