"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class MarkdownPreviewConfig {
    static getConfigForResource(resource) {
        return new MarkdownPreviewConfig(resource);
    }
    constructor(resource) {
        const editorConfig = vscode.workspace.getConfiguration("editor", resource);
        const markdownConfig = vscode.workspace.getConfiguration("markdown", resource);
        const markdownEditorConfig = vscode.workspace.getConfiguration("[markdown]");
        this.scrollBeyondLastLine = editorConfig.get("scrollBeyondLastLine", false);
        this.wordWrap = editorConfig.get("wordWrap", "off") !== "off";
        if (markdownEditorConfig && markdownEditorConfig["editor.wordWrap"]) {
            this.wordWrap = markdownEditorConfig["editor.wordWrap"] !== "off";
        }
        this.previewFrontMatter = markdownConfig.get("previewFrontMatter", "hide");
        this.scrollPreviewWithEditorSelection = !!markdownConfig.get("preview.scrollPreviewWithEditorSelection", true);
        this.scrollEditorWithPreview = !!markdownConfig.get("preview.scrollEditorWithPreview", true);
        this.lineBreaks = !!markdownConfig.get("preview.breaks", false);
        this.doubleClickToSwitchToEditor = !!markdownConfig.get("preview.doubleClickToSwitchToEditor", true);
        this.markEditorSelection = !!markdownConfig.get("preview.markEditorSelection", true);
        this.fontFamily = markdownConfig.get("preview.fontFamily", undefined);
        this.fontSize = Math.max(8, +markdownConfig.get("preview.fontSize", NaN));
        this.lineHeight = Math.max(0.6, +markdownConfig.get("preview.lineHeight", NaN));
        this.styles = markdownConfig.get("styles", []);
    }
    isEqualTo(otherConfig) {
        for (const key in this) {
            if (this.hasOwnProperty(key) && key !== "styles") {
                if (this[key] !== otherConfig[key]) {
                    return false;
                }
            }
        }
        // Check styles
        if (this.styles.length !== otherConfig.styles.length) {
            return false;
        }
        for (let i = 0; i < this.styles.length; ++i) {
            if (this.styles[i] !== otherConfig.styles[i]) {
                return false;
            }
        }
        return true;
    }
}
exports.default = MarkdownPreviewConfig;
//# sourceMappingURL=markdownPreviewConfig.js.map