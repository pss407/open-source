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
const cheerio = require("cheerio");
const xrefInfo_1 = require("./xrefInfo");
class XrefService {
    static resolveAsync(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = cheerio.load(body);
            const promises = [];
            $("xref").each((_, elem) => {
                const uid = $(elem).attr("href").split("?")[0];
                const promise = XrefService.queryAsync(uid)
                    .then((xrefInfo) => {
                    let source;
                    if (xrefInfo) {
                        source = `<a href="${xrefInfo.href}">${xrefInfo.name}</a>`;
                    }
                    else {
                        const raw = $(elem).data("raw-source");
                        source = `<span>${this.encodeHtml(raw)}</span>`;
                    }
                    $(elem).replaceWith(source);
                });
                promises.push(promise);
            });
            yield Promise.all(promises);
            return $("body").html();
        });
    }
    static queryAsync(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = XrefService.cache.get(uid);
            if (result !== undefined) {
                return result;
            }
            const response = yield axios_1.default.get(XrefService.apiUrl + uid);
            const etag = response.headers.etag;
            const data = response.data[0];
            result = !data ? null : new xrefInfo_1.XrefInfo(data.name, data.fullName, data.href, etag);
            XrefService.cache.set(uid, result);
            return result;
        });
    }
    static encodeHtml(href) {
        const entityPairs = [
            { character: "&", html: "&amp;" },
            { character: "<", html: "&lt;" },
            { character: ">", html: "&gt;" },
            { character: "'", html: "&apos;" },
            { character: `"`, html: "&quot;" },
        ];
        for (const pair of entityPairs) {
            href = href.replace(pair.character, pair.html);
        }
        return href;
    }
}
XrefService.apiUrl = "https://xref.docs.microsoft.com/query?uid=";
XrefService.cache = new Map();
exports.XrefService = XrefService;
//# sourceMappingURL=xrefResolver.js.map