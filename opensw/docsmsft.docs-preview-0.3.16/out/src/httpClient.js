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
const axios_1 = require("axios");
class HttpClient {
    static postAsync(content, filePath, basePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield axios_1.default.post(this.apiUrl, {
                    basePath: basePath || ".",
                    content,
                    filePath,
                });
            }
            catch (err) {
                this.HandleError(err);
            }
        });
    }
    static getAsync(querystring) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield axios_1.default.get(this.apiUrl + querystring);
            }
            catch (err) {
                this.HandleError(err);
            }
        });
    }
    static exitAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            yield HttpClient.getAsync(`?command=exit`);
        });
    }
    static pingAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            yield HttpClient.getAsync(`?command=ping`);
        });
    }
    static HandleError(err) {
        const response = err.response;
        if (!response) {
            throw new Error("No Service Response");
        }
        switch (response.status) {
            case 400:
                throw new Error(`[Client Error]: ${response.statusText}`);
            case 500:
                throw new Error(`[Server Error]: ${response.statusText}`);
            default:
                throw new Error(err);
        }
    }
}
HttpClient.apiUrl = "http://127.0.0.1:4462";
exports.HttpClient = HttpClient;
//# sourceMappingURL=httpClient.js.map