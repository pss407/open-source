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
const childProcess = require("child_process");
const fs = require("fs");
const vscode_1 = require("vscode");
const httpClient_1 = require("./httpClient");
const util = require("./util/common");
const ExtensionDownloader_1 = require("./util/ExtensionDownloader");
class MarkdocsServer {
    constructor(context) {
        this.started = false;
        this.context = context;
    }
    ensureRuntimeDependencies(extension, channel, logger) {
        return util.installFileExists(util.InstallFileType.Lock)
            .then((exists) => {
            if (!exists) {
                const downloader = new ExtensionDownloader_1.ExtensionDownloader(channel, logger, extension.packageJSON);
                return downloader.installRuntimeDependencies();
            }
            else {
                return true;
            }
        });
    }
    startMarkdocsServerAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const hasStarted = yield this.hasAlreadyStartAsync();
            if (hasStarted) {
                return;
            }
            const serverPath = this.getServerPath();
            if (!serverPath) {
                vscode_1.window.showErrorMessage(`[Markdocs Error]: Markdocs server can't be found.`);
                return;
            }
            try {
                if (serverPath.indexOf("MarkdocsService.dll") !== -1) {
                    this.spawnProcess = childProcess.spawn("dotnet", [serverPath]);
                }
                else {
                    this.spawnProcess = childProcess.spawn(serverPath);
                }
            }
            catch (err) {
                vscode_1.window.showErrorMessage(`[Markdocs Error]: ${err}`);
                return;
            }
            if (!this.spawnProcess.pid) {
                vscode_1.window.showErrorMessage(`[Markdocs Error] Error occurs while spawning markdocs local server.`);
                return;
            }
            this.spawnProcess.stdout.on("data", (data) => {
                this.started = false;
            });
            this.spawnProcess.stderr.on("data", (data) => {
                vscode_1.window.showErrorMessage(`[Markdocs Server Error]: ${data.toString()}`);
            });
            yield this.ensureMarkdocsServerWorkAsync();
        });
    }
    stopMarkdocsServerAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const hasStarted = yield this.hasAlreadyStartAsync();
            if (hasStarted) {
                this.spawnProcess.kill();
            }
        });
    }
    ensureMarkdocsServerWorkAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                try {
                    yield httpClient_1.HttpClient.pingAsync();
                    return;
                }
                catch (Error) {
                    yield this.sleepAsync(100);
                }
            }
        });
    }
    hasAlreadyStartAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield httpClient_1.HttpClient.pingAsync();
                return true;
            }
            catch (Error) {
                return false;
            }
        });
    }
    sleepAsync(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve((resolve) => {
                setTimeout(() => {
                    resolve();
                }, ms);
            });
        });
    }
    getServerPath() {
        const serverPaths = [
            ".markdocs/MarkdocsService",
            ".markdocs/MarkdocsService.exe",
            ".markdocs/MarkdocsService.dll",
        ];
        for (let p of serverPaths) {
            p = this.context.asAbsolutePath(p);
            if (fs.existsSync(p)) {
                return p;
            }
        }
    }
}
exports.MarkdocsServer = MarkdocsServer;
//# sourceMappingURL=server.js.map