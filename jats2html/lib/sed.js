/* ***
XMLやHTMLではなくテキストファイルとして変換
- `title`要素を`jats-title`に変換
- `jats-title`要素の空要素タグを開始タグと終了タグに変換
- `body`要素を`jats-body`に変換
JATS XML文書のサンプルが、テキストを直下に持たない要素は、1行1要素であることを想定している。
*** */

export const Sed = (textFile) => {
    const out1 = textFile.replaceAll(/<(\/?)title(\/?)>/g, 
        '<$1jats-title$2>');
    const out2 = out1.replaceAll(/<jats-title\/>/g, 
        '<jats-title></jats-title>');
    const out3 = out2.replaceAll(/<(\/?)body(\/?)>/g, '<$1jats-body$2>');
    return out3;
}