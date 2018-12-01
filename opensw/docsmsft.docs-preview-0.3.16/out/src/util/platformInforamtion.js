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
const commandExists = require("command-exists");
const os = require("os");
const util = require("./common");
const platform_1 = require("./platform");
class PlatformInformation {
    constructor(platform, architecture, distribution = null) {
        this.platform = platform;
        this.architecture = architecture;
        this.distribution = distribution;
    }
    static GetCurrent() {
        return __awaiter(this, void 0, void 0, function* () {
            const platform = os.platform();
            let architecturePromise;
            let distributionPromise;
            const supportNetcore = yield this.IsSupportNetCore();
            if (supportNetcore) {
                return Promise.resolve(new PlatformInformation("netcore", "netcore", null));
            }
            switch (platform) {
                case "win32":
                    architecturePromise = PlatformInformation.GetWindowsArchitecture();
                    distributionPromise = Promise.resolve(null);
                    break;
                case "darwin":
                    architecturePromise = PlatformInformation.GetUnixArchitecture();
                    distributionPromise = Promise.resolve(null);
                    break;
                case "linux":
                    architecturePromise = PlatformInformation.GetUnixArchitecture();
                    distributionPromise = platform_1.LinuxDistribution.GetCurrent();
                    break;
                default:
                    throw new Error(`Unsupported platform: ${platform}`);
            }
            return Promise.all([architecturePromise, distributionPromise])
                .then(([arch, distro]) => {
                return new PlatformInformation(platform, arch, distro);
            });
        });
    }
    static GetWindowsArchitecture() {
        return new Promise((resolve, reject) => {
            if (process.env.PROCESSOR_ARCHITECTURE === "x86" && process.env.PROCESSOR_ARCHITEW6432 === undefined) {
                resolve("x86");
            }
            else {
                resolve("x86_64");
            }
        });
    }
    static GetUnixArchitecture() {
        return util.execChildProcess("uname -m")
            .then((architecture) => {
            if (architecture) {
                return architecture.trim();
            }
            return null;
        });
    }
    static IsSupportNetCore() {
        return commandExists("dotnet")
            .then(() => Promise.resolve(true))
            .catch(() => Promise.resolve(false));
    }
    isWindows() {
        return this.platform === "win32";
    }
    isMacOS() {
        return this.platform === "darwin";
    }
    isLinux() {
        return this.platform === "linux";
    }
    toString() {
        let result = this.platform;
        if (this.architecture) {
            if (result) {
                result += ", ";
            }
            result += this.architecture;
        }
        if (this.distribution) {
            if (result) {
                result += ", ";
            }
            result += this.distribution.toString();
        }
        return result;
    }
}
exports.PlatformInformation = PlatformInformation;
//# sourceMappingURL=platformInforamtion.js.map