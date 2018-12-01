"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const markdownPreviewConfig_1 = require("./markdownPreviewConfig");
class PreviewConfigManager {
    constructor() {
        this.previewConfigurationsForWorkspaces = new Map();
    }
    loadAndCacheConfiguration(resource) {
        const config = markdownPreviewConfig_1.default.getConfigForResource(resource);
        this.previewConfigurationsForWorkspaces.set(this.getKey(resource), config);
        return config;
    }
    shouldUpdateConfiguration(resource) {
        const key = this.getKey(resource);
        const currentConfig = this.previewConfigurationsForWorkspaces.get(key);
        const newConfig = markdownPreviewConfig_1.default.getConfigForResource(resource);
        return (!currentConfig || !currentConfig.isEqualTo(newConfig));
    }
    getKey(resource) {
        const folder = vscode.workspace.getWorkspaceFolder(resource);
        if (!folder) {
            return "";
        }
        return folder.uri.toString();
    }
}
exports.default = PreviewConfigManager;
//# sourceMappingURL=previewConfigManager.js.map