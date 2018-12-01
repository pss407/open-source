"use-strict";
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
const os = require("os");
const path = require("path");
const quick_pick_controller_1 = require("../controllers/quick-pick-controller");
const extension_1 = require("../extension");
const common = require("./common");
exports.docsAuthoringDirectory = path.join(os.homedir(), "Docs Authoring");
exports.templateDirectory = path.join(exports.docsAuthoringDirectory, "templates");
// download a copy of the template repo to the "docs authoring" directory.  no .git-related files will be generated by this process.
function downloadRepo() {
    return __awaiter(this, void 0, void 0, function* () {
        const download = require("download-git-repo");
        const templateRepo = "MicrosoftDocs/content-templates";
        download(templateRepo, exports.docsAuthoringDirectory, (err) => {
            if (err) {
                common.postWarning(err ? "Error: Cannot connect to " + templateRepo : "Success");
                extension_1.output.appendLine(err ? "Error: Cannot connect to " + templateRepo : "Success");
            }
            else {
                quick_pick_controller_1.showTemplates();
            }
        });
    });
}
exports.downloadRepo = downloadRepo;
// the download process is on a repo-level so this function will be used to delete any files pulled down by the download process.
function cleanupDownloadFiles(templates) {
    let workingDirectory;
    if (templates) {
        workingDirectory = exports.templateDirectory;
    }
    else {
        workingDirectory = exports.docsAuthoringDirectory;
    }
    fs.readdir(workingDirectory, (err, files) => {
        files.forEach((file) => {
            const fullFilePath = path.join(workingDirectory, file);
            fs.stat(path.join(fullFilePath), (error, stats) => {
                if (stats.isFile()) {
                    fs.unlinkSync(fullFilePath);
                }
                if (error) {
                    extension_1.output.appendLine("Error: " + error);
                }
            });
        });
    });
}
exports.cleanupDownloadFiles = cleanupDownloadFiles;
//# sourceMappingURL=github.js.map