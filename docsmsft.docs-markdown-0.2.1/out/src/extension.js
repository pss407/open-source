"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* The module 'vscode' contains the VS Code extensibility API
 The LoadToolbar function will populate items in the toolbar, but only when the extension loads the first time.
 The common file provides functions that are useful across all commands.
 Logging, Error Handling, VS Code window updates, etc.
*/
const vscode = require("vscode");
const alert_controller_1 = require("./controllers/alert-controller");
const bold_controller_1 = require("./controllers/bold-controller");
const code_controller_1 = require("./controllers/code-controller");
const include_controller_1 = require("./controllers/include-controller");
const italic_controller_1 = require("./controllers/italic-controller");
const list_controller_1 = require("./controllers/list-controller");
const master_redirect_controller_1 = require("./controllers/master-redirect-controller");
const media_controller_1 = require("./controllers/media-controller");
const preview_controller_1 = require("./controllers/preview-controller");
const quick_pick_menu_controller_1 = require("./controllers/quick-pick-menu-controller");
const snippet_controller_1 = require("./controllers/snippet-controller");
const table_controller_1 = require("./controllers/table-controller");
const common_1 = require("./helper/common");
const log = require("./helper/log");
const ui_1 = require("./helper/ui");
const telemetry_1 = require("./telemetry/telemetry");
exports.output = vscode.window.createOutputChannel("docs-markdown");
exports.masterRedirectOutput = vscode.window.createOutputChannel("docs-markdown-master-redirect");
/**
 * Provides the commands to the extension. This method is called when extension is activated.
 * Extension is activated the very first time the command is executed.
 * preview commands -
 * formatting commands -
 *
 * param {vscode.ExtensionContext} the context the extension runs in, provided by vscode on activation of the extension.
 */
function activate(context) {
    log.debug("Activating Markdown Authoring Extension.");
    // Places "Docs Markdown Authoring" into the Toolbar
    new ui_1.UiHelper().LoadToolbar();
    // check for docs extensions
    installedExtensionsCheck();
    // Creates an array of commands from each command file.
    const AuthoringCommands = [];
    alert_controller_1.insertAlertCommand().forEach((cmd) => AuthoringCommands.push(cmd));
    include_controller_1.insertIncludeCommand().forEach((cmd) => AuthoringCommands.push(cmd));
    media_controller_1.insertLinksAndMediaCommands().forEach((cmd) => AuthoringCommands.push(cmd));
    list_controller_1.insertListsCommands().forEach((cmd) => AuthoringCommands.push(cmd));
    snippet_controller_1.insertSnippetCommand().forEach((cmd) => AuthoringCommands.push(cmd));
    table_controller_1.insertTableCommand().forEach((cmd) => AuthoringCommands.push(cmd));
    bold_controller_1.boldFormattingCommand().forEach((cmd) => AuthoringCommands.push(cmd));
    code_controller_1.codeFormattingCommand().forEach((cmd) => AuthoringCommands.push(cmd));
    italic_controller_1.italicFormattingCommand().forEach((cmd) => AuthoringCommands.push(cmd));
    quick_pick_menu_controller_1.quickPickMenuCommand().forEach((cmd) => AuthoringCommands.push(cmd));
    preview_controller_1.previewTopicCommand().forEach((cmd) => AuthoringCommands.push(cmd));
    master_redirect_controller_1.getMasterRedirectionCommand().forEach((cmd) => AuthoringCommands.push(cmd));
    // Telemetry
    context.subscriptions.push(new telemetry_1.Reporter(context));
    // Attempts the registration of commands with VS Code and then add them to the extension context.
    try {
        AuthoringCommands.map((cmd) => {
            const commandName = cmd.command;
            const command = vscode.commands.registerCommand(commandName, cmd.callback);
            context.subscriptions.push(command);
        });
    }
    catch (error) {
        log.error("Error registering commands with vscode extension context: " + error);
    }
    log.debug("Registered commands with vscode extension context.");
    // if the user changes markdown.showToolbar in settings.json, display message telling them to reload.
    vscode.workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration("markdown.showToolbar")) {
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
function installedExtensionsCheck() {
    // create a list to house docs extension names, loop through
    const docsExtensions = [
        "docsmsft.docs-article-templates",
        "docsmsft.docs-preview",
    ];
    const { msTimeValue } = common_1.generateTimestamp();
    docsExtensions.forEach((extensionName) => {
        const friendlyName = extensionName.split(".").reverse()[0];
        const inactiveMessage = `[${msTimeValue}] - The ${friendlyName} extension is not installed.`;
        common_1.checkExtension(extensionName, inactiveMessage);
    });
}
exports.installedExtensionsCheck = installedExtensionsCheck;
// this method is called when your extension is deactivated
function deactivate() {
    exports.output.appendLine("Deactivating extension.");
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map