/* ***
記事外部リンク
href属性が'#'で始まらないa要素
*** */

export const ExtLink = (document) => {
    document.querySelectorAll('a:not([href^="#"])').forEach((a) => {
        // console.log(`${a.getAttribute('href')}`);
        const extLink = document.createElement('ext-link');
        const href = a.getAttribute('href');
        if (href) {
            extLink.setAttribute('xlink:href', a.getAttribute('href'));
        }
        a.after(extLink);
        a.childNodes.forEach((child) => {
            if (child.nodeType === 3) {
                extLink.textContent = child.textContent;
            } else {
                extLink.appendChild(child);
            }
        });
        a.remove();
    });
}

/* ***
End of script
*** */