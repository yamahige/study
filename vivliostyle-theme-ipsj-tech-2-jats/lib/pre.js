/* ***
pre
preをpreformat要素に変換
*** */

export const Pre = (document) => {
    for (const pre of document.querySelectorAll('pre')) {
        const p = document.createElement('p');
        p.setAttribute('content-type', 'preformat');
        p.append(...pre.children);
        pre.replaceWith(p);
        const className = pre.getAttribute('class');
        if (className) p.setAttribute('specific-use', className);
    }
}