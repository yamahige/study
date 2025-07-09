import { JSDOM } from 'jsdom';
import serializer from 'w3c-xmlserializer';
import { Convert } from './lib/convert.js';
import { Sed } from './lib/sed.js';

export const J2HN = (jatsXml) => {
    const replacedJatsXml = Sed(jatsXml);
    const dom = new JSDOM(replacedJatsXml,
        // text/xml or application/xmlなどXMLとして読み込むと&emsp;などの文字参照が正しく処理されない。 
        {
            contentType: "text/html"
        }
    );
    const document = dom.window.document;

    /* ***
    変換
    *** */
    Convert(document);

    /* ***
    出力
    *** */

    const htmlOutput = serializer(document);
    // console.log(htmlOutput);

    return htmlOutput;
}

/* ***
End of script
*** */