/* ***
XMLやHTMLではなくテキストファイルとして変換
- `title`要素を`jats-title`に変換
- `jats-title`要素の空要素タグを開始タグと終了タグに変換
- `body`要素を`jats-body`に変換
JATS XML文書のサンプルが、テキストを直下に持たない要素は、1行1要素であることを想定している。
*** */

export const Sed = (textFile) => {
    // `title`要素を`jats-title`に変換
    // const out1 = textFile.replaceAll(/<(\/?)title(\/?)>/g, 
    const out1 = textFile.replaceAll(/<(\/?)title(( .*?)*?)(\/?)>/g, 
        '<$1jats-title$3$4>');
    // 空要素タグを開始タグと終了タグに変換
    // const out2 = out1.replaceAll(/<jats-title\/>/g, 
    //     '<jats-title></jats-title>');
    const out2 = out1.replaceAll(/<([^ \/>]+?)\/>/g, 
        '<$1></$1>');
    const out3 = out2.replaceAll(/<(\/?)body(\/?)>/g, '<$1jats-body$2>');
    return out3;
}