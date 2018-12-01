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
const cheerio = require("cheerio");
const axios_1 = require("axios");
class XrefService {
    constructor() {
        this.apiUrl = "https://xref.docs.microsoft.com/query?uid=";
    }
    resolve(body) {
        const $ = cheerio.load(body);
        $("xref").each((_, elem) => {
            const source = $(elem).data("raw-source");
            $(elem).replaceWith(source);
        });
        return $("body").html();
    }
    query(name) {
        return __awaiter(this, void 0, void 0, function* () {
            var response = yield axios_1.default.get(this.apiUrl + name);
            var data = response.data;
            return new XrefResult(data.name, data.fullName, data.href);
        });
    }
}
XrefService.xrefTagName = "xref";
exports.XrefService = XrefService;
class XrefResult {
    constructor(name, fullName, href) {
        this.name = name;
        this.fullName = fullName;
        this.href = href;
    }
}
let service = new XrefService();
service.query("System.String").then(result => console.log(result));
//# sourceMappingURL=tempCodeRunnerFile.js.map