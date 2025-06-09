/* ***
pre
preという要素はないので、p要素に変換
*** */

export const Pre = (document) => {
    for (const pre of document.querySelectorAll('pre')) {
        const p = document.createElement('p');
        p.append(...pre.children);
        pre.replaceWith(p);
        const className = pre.getAttribute('class');
        const comment = document.createComment(`This was a pre element with class ${className}.`);
        p.before(comment);
    }
}