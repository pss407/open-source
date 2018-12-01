"use-strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
exports.gitHubID = vscode.workspace.getConfiguration("docs.templates").githubid;
exports.alias = vscode.workspace.getConfiguration("docs.templates").alias;
exports.missingValue = "NO VALUE SET";
//# sourceMappingURL=user-metadata.js.map