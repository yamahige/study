import { parseArgs } from 'util';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import { IdCheck } from './lib/id.js';
import { Front } from './lib/front/front.js';
import { Back } from './lib/back/back.js';
import { Sec } from './lib/sec.js';
import { List } from './lib/list.js';
// import { FnGroup } from './lib/back/fnGroup.js';
import { Math } from './lib/math.js';
import { Label } from './lib/label.js';
import { Figure } from './lib/figure.js';
import { TableWrap } from './lib/tableWrap.js';
import { Xref } from './lib/xref.js';
import { ExtLink } from './lib/extLink.js';
import { Span } from './lib/span.js';
import { Blockquote } from './lib/blockquote.js';
import { Pre } from './lib/pre.js';
import { Code } from './lib/code.js';
import serializer from 'w3c-xmlserializer';
import formatXml from 'xml-formatter';
import { ReplaceNS } from './lib/util.js';

const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>\n';
const doctype = '<!DOCTYPE article PUBLIC "-//NLM//DTD JATS (Z39.96) Journal Publishing DTD v1.1 20151215//EN" "https://www.jstage.jst.go.jp/dtds/1.1/JATS-journalpublishing1.dtd">\n';
const articleElement = '<article' +
    ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' +
    ' xmlns:mml="http://www.w3.org/1998/Math/MathML"' +
    ' xmlns:xlink="http://www.w3.org/1999/xlink"' +
    ' xmlns:ali="http://www.niso.org/schemas/ali/1.0/"' +
    ' article-type="research-article" xml:lang="ja">\n';

// const inputFile = './example/sample2.html';
const { values, positionals } = parseArgs({
    // args: process.argv.slice(2),
    allowPositionals: true,
    options: {
        'raw': {
            type: 'boolean',
            short: 'r',
            description: 'Output the XML without pretty printing',
            default: false,
        },
        'help': {
            type: 'boolean',
            short: 'h',
            description: 'Show this help message',
            default: false,
        },
    }
});
// console.warn(`values: ${JSON.stringify(values)}`);
// console.warn(`positionals: ${JSON.stringify(positionals)}`);

if (values.help) {
    console.log('Usage: node conv.js [options] <input-file>');
    console.log('Options:');
    console.log('  -r, --raw       Output the XML without pretty printing');
    console.log('  -h, --help      Show this help message');
    process.exit(0);
}

const inputFile = positionals[0];
if (!inputFile) {
    console.error('Usage: node conv.js <input-file>');
    process.exit(1);
}
const html = readFileSync(inputFile, 'utf-8');

const dom = new JSDOM(html);
const document = dom.window.document;
const body = document.body;

// console.warn(`document.defaultView: ${document.defaultView}`);
// JSDOMのバージョンによってはdefaultViewがundefinedになることがあるので、
// その場合はwindowを代入する
// これにより、document.defaultViewが常に存在するようになる
// これがないと、JATSの名前空間に変換する際にエラーになる
// document.defaultView ??= dom.window;


/* ***
id属性
*** */
IdCheck(document);

/* ***
front
*** */
const front = Front(document);
body.before(front);

/* ***
back
*** */
const back = Back(document);

/* ***
リスト
*** */
List(document);

/* ***
脚注
*** */
// FnGroup(document);

/* ***
数式
*** */
Math(document);
// 数式番号の参照
Label(document, document,
    '[specific-use~="equation"][specific-use~="number"]',
    { ja: '(', en: '(' },
    { ja: ')', en: ')' },
    'disp-formula',
    'beforeend');

/* ***
図
*** */
Figure(document);

/* ***
表
*** */
TableWrap(document);

/* ***
リンク
*** */
Xref(document);
ExtLink(document);

/* ***
inline要素
*** */
Span(document);

/* ***
blockquote
*** */
Blockquote(document);

/* ***
pre
*** */
Pre(document);

/* ***
Code
*** */
Code(document);

/* ***
seciton
backの後で呼ぶこと。付録がsection要素であることを前提にbackが処理してる
*** */
Sec(document);

/* ***
HTML名前空間からJATS名前空間にノードをコピー
*** */

const hLang = document.documentElement.getAttribute('lang');
const jatsDom = new JSDOM('<article lang="ja" xml:lang="ja"><body></body></article>',
    { contentType: 'text/xml'}
);
const jatsDomDocument = jatsDom.window.document;
const jFront = ReplaceNS(jatsDomDocument, front, hLang);
const jBody = ReplaceNS(jatsDomDocument, body, hLang);
const jBack = ReplaceNS(jatsDomDocument, back, hLang);


/* ***
出力
*** */

const xmlOutput = xmlDeclaration + doctype + articleElement +
    serializer(jFront) + 
    serializer(jBody) + 
    serializer(jBack) + 
    '</article>';
if (values.raw) {
    // Output the XML without pretty printing
    console.log(xmlOutput);
} else {
    // Output the XML with pretty printing
    console.log(formatXml(xmlOutput, {
        indentation: '  ',
        collapseContent: true,
        lineSeparator: '\n'
    }));
}

/* ***
End of script
*** */