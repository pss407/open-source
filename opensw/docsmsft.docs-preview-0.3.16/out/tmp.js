"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = require("cheerio");
const $ = cheerio.load(`<p>
<xref href="uid_of_the_topic" data-throw-if-not-resolved="False" data-raw-source='@"uid_of_the_topic0"'>
</xref>
</p>
<p>
<xref href="uid_of_the_topic" data-throw-if-not-resolved="False" data-raw-source='@"uid_of_the_topic1"'>
</xref>
</p>`);
// console.log($.html());
$('xref').each((i, elem) => {
    var source = $(elem).data("raw-source");
    $(elem).replaceWith(source);
});
console.log($("body").html());
//# sourceMappingURL=tmp.js.map