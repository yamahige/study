import { Convert } from './lib/convert.js';
import { Sed } from './lib/sed.js';

export const J2H = (jatsXml) => {
    const replacedJatsXml = Sed(jatsXml);
    const document = new DOMParser().parseFromString(replacedJatsXml,
        // text/xml or application/xmlなどXMLとして読み込むと&emsp;などの文字参照が正しく処理されない。 
        "text/html"
    );

    /* ***
    変換
    *** */
    Convert(document);

    /* ***
    出力
    *** */

    const htmlOutput = new XMLSerializer().serializeToString(document);
    // console.log(htmlOutput);

    return htmlOutput;
}

/* ***
End of script
*** */