import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import { IdCheck } from './lib/id.js';
import { Front } from './lib/front/front.js';
import { Back } from './lib/back/back.js';
import { Sec } from './lib/sec.js';
import { List } from './lib/list.js';
import { Math } from './lib/math.js';
import { Figure } from './lib/figure.js';
import { TableWrap } from './lib/tableWrap.js';
import { Xref } from './lib/xref.js';
import { ExtLink } from './lib/extLink.js';
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
const inputFile = process.argv[2];
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
seciton
backの後で呼ぶこと。付録がsection要素であることを前提にbackが処理してる
*** */
Sec(document);

/* ***
リスト
*** */
List(document);

/* ***
数式
*** */
Math(document);

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
pre
*** */
Pre(document);

/* ***
Code
*** */
Code(document);

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
console.log(formatXml(xmlOutput, {
    indentation: '  ',
    collapseContent: true,
    lineSeparator: '\n'
}));

/* ***
End of script
*** */