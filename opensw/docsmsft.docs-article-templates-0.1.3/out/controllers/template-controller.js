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
const common_1 = require("../helper/common");
const github_1 = require("../helper/github");
function applyTemplateCommand() {
    const commands = [
        { command: applyTemplate.name, callback: applyTemplate },
    ];
    return commands;
}
exports.applyTemplateCommand = applyTemplateCommand;
function applyTemplate() {
    return __awaiter(this, void 0, void 0, function* () {
        // generate current date/time for timestamp, clean up template directory and download copy of the template repo.
        common_1.generateTimestamp();
        github_1.cleanupDownloadFiles(true);
        github_1.downloadRepo();
    });
}
exports.applyTemplate = applyTemplate;
//# sourceMappingURL=template-controller.js.map