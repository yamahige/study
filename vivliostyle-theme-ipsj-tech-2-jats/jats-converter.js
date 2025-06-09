/* ***
ブラウザーで動作するJATS変換ツール
*** */

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
import { ReplaceNS } from './lib/util.js';

const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>\n';
const doctype = '<!DOCTYPE article PUBLIC "-//NLM//DTD JATS (Z39.96) Journal Publishing DTD v1.1 20151215//EN" "https://www.jstage.jst.go.jp/dtds/1.1/JATS-journalpublishing1.dtd">\n';
const articleElement = '<article' +
    ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' +
    ' xmlns:mml="http://www.w3.org/1998/Math/MathML"' +
    ' xmlns:xlink="http://www.w3.org/1999/xlink"' +
    ' xmlns:ali="http://www.niso.org/schemas/ali/1.0/"' +
    ' article-type="research-article" xml:lang="ja">\n';

export const ConvertToJATS = (content) => {
    const parser = new DOMParser();
    const document = parser.parseFromString(content, 'text/html');
    const body = document.body;

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
    const jatsDomDocument = parser.parseFromString(
        '<article lang="ja" xml:lang="ja"><body></body></article>',
        'text/xml'
    );
    const jFront = ReplaceNS(jatsDomDocument, front, hLang);
    const jBody = ReplaceNS(jatsDomDocument, body, hLang);
    const jBack = ReplaceNS(jatsDomDocument, back, hLang);


    /* ***
    出力
    *** */

    const XMLs = new XMLSerializer();
    const xmlOutput = xmlDeclaration + doctype + articleElement + '\n' +
        XMLs.serializeToString(jFront) + '\n' +
        XMLs.serializeToString(jBody) + '\n' +
        XMLs.serializeToString(jBack) + '\n' +
        '</article>';
    // console.log(formatXml(xmlOutput, {
    //     indentation: '  ',
    //     collapseContent: true,
    //     lineSeparator: '\n'
    // }));
    return xmlOutput;    
}

/* ***
End of script
*** */