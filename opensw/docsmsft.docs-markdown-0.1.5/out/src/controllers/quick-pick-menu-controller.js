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
    const opts = { placeHolder: "어떤 기능을 돌리시고 싶으십니까?" };
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
        label: "$(link) 헤딩과 연결",
    }, {
        description: "",
        label: "$(file-media) 이미지 삽입",
    }, {
        description: "",
        label: "$(clippy) 파일 포함시키기",
    }, {
        description: "",
        label: "$(file-code) 스니펫",
    }, {
        description: "",
        label: "$(device-camera-video) 비디오 삽입",
    });
    if (common_1.checkExtension("docsmsft.docs-article-templates")) {
        items.push({
            description: "",
            label: "$(diff) 작성가능한 마크다운 불러오기",
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
            case "기울임체":
                italic_controller_1.formatItalic();
                break;
            case "블록화":
                code_controller_1.formatCode();
                break;
            case "알림기능":
                alert_controller_1.insertAlert();
                break;
            case "번호 목록":
                list_controller_1.insertNumberedList();
                break;
            case "점 목록":
                list_controller_1.insertBulletedList();
                break;
            case "테이블":
                table_controller_1.insertTable();
                break;
            case "저장소의 파일 연결":
                media_controller_1.Insert(false);
                break;
            case "웹페이지 연결":
                media_controller_1.insertURL();
                break;
            case "헤딩과 연결":
                media_controller_1.selectLinkType();
                break;
            case "이미지 삽입":
                media_controller_1.insertImage();
                break;
            case "파일 포함시키기":
                include_controller_1.insertInclude();
                break;
            case "스니펫":
                snippet_controller_1.insertSnippet();
                break;
            case "비디오 삽입":
                media_controller_1.insertVideo();
                break;
            case "미리보기":
                preview_controller_1.previewTopic();
                break;
            case "작성가능한 마크다운 불러오기":
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