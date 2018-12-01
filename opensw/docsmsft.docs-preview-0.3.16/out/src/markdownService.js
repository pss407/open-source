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
const httpClient_1 = require("./httpClient");
class MarkdownService {
    static markupAsync(content, filePath, basePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield httpClient_1.HttpClient.postAsync(content, filePath, basePath);
            return response.data.content;
        });
    }
}
exports.default = MarkdownService;
//# sourceMappingURL=markdownService.js.map