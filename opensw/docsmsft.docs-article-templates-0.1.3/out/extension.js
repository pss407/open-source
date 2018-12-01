"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const template_controller_1 = require("./controllers/template-controller");
exports.output = vscode.window.createOutputChannel("docs-article-templates");
function activate(context) {
    // Creates an array of commands from each command file.
    const TemplateCommands = [];
    template_controller_1.applyTemplateCommand().forEach((cmd) => TemplateCommands.push(cmd));
    try {
        TemplateCommands.map((cmd) => {
            const commandName = cmd.command;
            const command = vscode.commands.registerCommand(commandName, cmd.callback);
            context.subscriptions.push(command);
        });
    }
    catch (error) {
        exports.output.appendLine("Error registering commands with vscode extension context: " + error);
    }
    // if the user changes markdown.showToolbar in settings.json, display message telling them to reload.
    vscode.workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration("docs.templates.githubID" || "docs.templates.alias")) {
            vscode.window.showInformationMessage("Your updated configuration has been recorded, but you must reload to see its effects.", "Reload")
                .then((res) => {
                if (res === "Reload") {
                    vscode.commands.executeCommand("workbench.action.reloadWindow");
                }
            });
        }
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    exports.output.appendLine("Deactivating extension.");
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map