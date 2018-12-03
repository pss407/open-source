"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const extension_1 = require("../extension");
const common_1 = require("../helper/common");
const alert_controller_1 = require("./alert-controller");
const bold_controller_1 = require("./bold-controller");
const code_controller_1 = require("./code-controller");
const include_controller_1 = require("./include-controller");
const italic_controller_1 = require("./italic-controller");
const list_controller_1 = require("./list-controller");
const media_controller_1 = require("./media-controller");
const preview_controller_1 = require("./preview-controller");
const snippet_controller_1 = require("./snippet-controller");
const table_controller_1 = require("./table-controller");
const template_controller_1 = require("./template-controller");
function quickPickMenuCommand() {
    const commands = [
        { command: markdownQuickPick.name, callback: markdownQuickPick },
    ];
    return commands;
}
exports.quickPickMenuCommand = quickPickMenuCommand;
function markdownQuickPick() {
    const opts = { placeHolder: "Which Markdown command would you like to run?" };
    const items = [];
    if (common_1.checkExtension("docsmsft.docs-preview")) {
        items.push({
            description: "",
            label: "$(browser) 미리보기",
        });
    }
    items.push({
        description: "",
        label: "$(pencil) 굵게쓰기",
    }, {
        description: "",
        label: "$(info) 기울임체",
    }, {
        description: "",
        label: "$(code) 블록화",
    }, {
        description: "Insert note, tip, important, caution, or warning",
        label: "$(alert) 알림기능",
    }, {
        description: "",
        label: "$(list-ordered) 번호 목록",
    }, {
        description: "",
        label: "$(list-unordered) 점 목록",
    }, {
        description: "",
        label: "$(diff-added) 테이블",
    }, {
        description: "",
        label: "$(file-symlink-directory) 저장소의 파일 연결",
    }, {
        description: "",
        label: "$(globe) 웹페이지 연결",
    }, {
        description: "",
        label: "$(link) Heading과 연결",
    }, {
        description: "",
        label: "$(file-media) 이미지 삽입",
    }, {
        description: "",
        label: "$(clippy) Include",
    }, {
        description: "",
        label: "$(file-code) Snippets",
    }, {
        description: "",
        label: "$(device-camera-video) 비디오 삽입",
    });
    if (common_1.checkExtension("docsmsft.docs-article-templates")) {
        items.push({
            description: "",
            label: "$(diff) Docs Authoring폴더에서 Markdown 불러오기",
        });
    }
    vscode.window.showQuickPick(items, opts).then((selection) => {
        if (!selection) {
            return;
        }
        if (!vscode.window.activeTextEditor) {
            vscode.window.showInformationMessage("Open a file first to manipulate text selections");
            return;
        }
        const convertLabelToLowerCase = selection.label.toLowerCase();
        const selectionWithoutIcon = convertLabelToLowerCase.split(")")[1].trim();
        switch (selectionWithoutIcon) {
            case "굵게쓰기":
                bold_controller_1.formatBold();
                break;
            case "italic":
                italic_controller_1.formatItalic();
                break;
            case "code":
                code_controller_1.formatCode();
                break;
            case "alert":
                alert_controller_1.insertAlert();
                break;
            case "numbered list":
                list_controller_1.insertNumberedList();
                break;
            case "bulleted list":
                list_controller_1.insertBulletedList();
                break;
            case "table":
                table_controller_1.insertTable();
                break;
            case "link to file in repo":
                media_controller_1.Insert(false);
                break;
            case "link to web page":
                media_controller_1.insertURL();
                break;
            case "link to heading":
                media_controller_1.selectLinkType();
                break;
            case "image":
                media_controller_1.insertImage();
                break;
            case "include":
                include_controller_1.insertInclude();
                break;
            case "snippets":
                snippet_controller_1.insertSnippet();
                break;
            case "video":
                media_controller_1.insertVideo();
                break;
            case "preview":
                preview_controller_1.previewTopic();
                break;
            case "template":
                template_controller_1.applyTemplate();
                break;
            default:
                const { msTimeValue } = common_1.generateTimestamp();
                extension_1.output.appendLine(msTimeValue + " - No quickpick case was hit.");
        }
    });
}
exports.markdownQuickPick = markdownQuickPick;
//# sourceMappingURL=quick-pick-menu-controller.js.map