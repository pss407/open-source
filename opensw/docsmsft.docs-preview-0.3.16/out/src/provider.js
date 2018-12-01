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
const path = require("path");
const vscode_1 = require("vscode");
const markdownService_1 = require("./markdownService");
const previewConfigManager_1 = require("./util/previewConfigManager");
const xrefResolver_1 = require("./xref/xrefResolver");
class DocumentContentProvider {
    constructor(context) {
        this.onDidChangeEvent = new vscode_1.EventEmitter();
        this.waiting = false;
        this.extraStyles = [];
        this.extraScripts = [];
        this.previewConfigurations = new previewConfigManager_1.default();
        this.yamlHeaderRegex = new RegExp(/<yamlheader.*?>([\s\S]*?)<\/yamlheader>/, "i");
        this.context = context;
    }
    provideTextDocumentContent(uri) {
        this.sourceUri = vscode_1.Uri.parse(uri.query);
        let initialLine;
        const editor = vscode_1.window.activeTextEditor;
        if (editor && editor.document.uri.toString() === this.sourceUri.toString()) {
            initialLine = editor.selection.active.line;
        }
        this.nonce = new Date().getTime() + "" + new Date().getMilliseconds();
        this.config = this.previewConfigurations.loadAndCacheConfiguration(this.sourceUri);
        this.initialData = {
            doubleClickToSwitchToEditor: this.config.doubleClickToSwitchToEditor,
            line: initialLine,
            previewUri: uri.toString(),
            scrollEditorWithPreview: this.config.scrollEditorWithPreview,
            scrollPreviewWithEditorSelection: this.config.scrollPreviewWithEditorSelection,
            source: this.sourceUri.toString(),
        };
        const workspaceRoot = vscode_1.workspace.rootPath;
        return vscode_1.workspace.openTextDocument(this.sourceUri)
            .then((document) => {
            const content = document.getText();
            if (!workspaceRoot) {
                return this.markupAsync(content, path.basename(document.fileName), path.dirname(document.fileName), document.uri);
            }
            const basePath = path.dirname(document.fileName);
            let docsetRoot = this.getDocsetRoot(basePath) || workspaceRoot;
            const filePath = path.relative(docsetRoot, document.fileName);
            docsetRoot = docsetRoot.replace(/\\/g, "/");
            return this.markupAsync(content, filePath, docsetRoot, document.uri);
        });
    }
    get onDidChange() {
        return this.onDidChangeEvent.event;
    }
    update(uri) {
        if (!this.waiting) {
            this.waiting = true;
            setTimeout(() => {
                this.waiting = false;
                this.onDidChangeEvent.fire(uri);
            }, 50);
        }
    }
    addScript(resource) {
        this.extraScripts.push(resource);
    }
    addStyle(resource) {
        this.extraStyles.push(resource);
    }
    markupAsync(markdown, filePath, basePath, uri) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = yield markdownService_1.default.markupAsync(markdown, filePath, basePath);
            body = this.filterYamlHeader(body);
            body = this.fixLinks(body, uri);
            body = yield xrefResolver_1.XrefService.resolveAsync(body);
            const result = `<!DOCTYPE html>
        <html>
        <head>
            <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
            <meta id="vscode-markdown-preview-data" data-settings="${JSON.stringify(this.initialData).replace(/"/g, "&quot;")}">
            ${this.getStyles(this.sourceUri, this.nonce, this.config)}
            <base href="${uri.toString(true)}">
        </head>
        <body>
            ${body}
            ${this.getScripts(this.nonce)}
            <script>hljs.initHighlightingOnLoad();</script>
        </body>
        </html>`;
            return result;
        });
    }
    filterYamlHeader(body) {
        return body.replace(this.yamlHeaderRegex, "");
    }
    getDocsetRoot(dir) {
        if (dir && path.dirname(dir) !== dir) {
            const config = path.join(dir, "docfx.json");
            if (fs.existsSync(config)) {
                return dir;
            }
            return this.getDocsetRoot(path.dirname(dir));
        }
        return null;
    }
    getStyles(resource, nonce, config) {
        const baseStyles = [
            this.getMediaPath("markdown.css"),
            this.getMediaPath("highlight.css"),
            this.getMediaPath("docfx.css"),
        ].concat(this.extraStyles.map((style) => style.toString()));
        return `${baseStyles.map((href) => `<link rel="stylesheet" type="text/css" href="${href}">`).join("\n")}
			${this.getSettingsOverrideStyles(nonce, config)}
			${this.computeCustomStyleSheetIncludes(resource, config)}`;
    }
    getScripts(nonce) {
        const scripts = [
            this.getNodeModulePath("jquery/dist/jquery.min.js"),
            this.getNodeModulePath("highlightjs/highlight.pack.js"),
            this.getMediaPath("main.js"),
            this.getMediaPath("docfx.js"),
        ].concat(this.extraScripts.map((resource) => resource.toString()));
        return scripts
            .map((source) => `<script src="${source}" nonce="${nonce}" charset="UTF-8"></script>`)
            .join("\n");
    }
    getSettingsOverrideStyles(nonce, config) {
        return `<style nonce="${nonce}">
			body {
				${config.fontFamily ? `font-family: ${config.fontFamily};` : ""}
				${isNaN(config.fontSize) ? "" : `font-size: ${config.fontSize}px;`}
				${isNaN(config.lineHeight) ? "" : `line-height: ${config.lineHeight};`}
			}
		</style>`;
    }
    computeCustomStyleSheetIncludes(resource, config) {
        if (config.styles && Array.isArray(config.styles)) {
            return config.styles.map((style) => {
                return `<link rel="stylesheet" class="code-user-style" data-source="${style.replace(/"/g, "&quot;")}" href="${this.fixHref(resource, style)}" type="text/css" media="screen">`;
            }).join("\n");
        }
        return "";
    }
    getMediaPath(mediaFile) {
        return vscode_1.Uri.file(this.context.asAbsolutePath(path.join("media", mediaFile))).toString();
    }
    getNodeModulePath(file) {
        return vscode_1.Uri.file(this.context.asAbsolutePath(path.join("node_modules", file))).toString();
    }
    fixLinks(document, resource) {
        return document.replace(new RegExp("((?:src|href)=[\"\"])([^#]*?)([\"\"])", "gmi"), (subString, p1, p2, p3) => {
            return [
                p1,
                this.fixHref(resource, p2, false),
                p3,
            ].join("");
        });
    }
    fixHref(resource, href, basedOnWorkspace = true) {
        if (!href) {
            return href;
        }
        // Use href if it is already an URL
        const hrefUri = vscode_1.Uri.parse(href);
        if (["file", "http", "https"].indexOf(hrefUri.scheme) >= 0) {
            return hrefUri.toString();
        }
        // Use href as file URI if it is absolute
        if (path.isAbsolute(href)) {
            return vscode_1.Uri.file(href).toString();
        }
        // use a workspace relative path if there is a workspace
        const root = vscode_1.workspace.getWorkspaceFolder(resource);
        if (root && basedOnWorkspace) {
            return vscode_1.Uri.file(path.join(root.uri.fsPath, href)).toString();
        }
        // otherwise look relative to the markdown file
        return href;
    }
}
DocumentContentProvider.scheme = "docsPreview";
exports.DocumentContentProvider = DocumentContentProvider;
function isMarkdownFile(document) {
    return document.languageId === "markdown"
        && document.uri.scheme !== DocumentContentProvider.scheme; // prevent processing of own documents
}
exports.isMarkdownFile = isMarkdownFile;
//# sourceMappingURL=provider.js.map