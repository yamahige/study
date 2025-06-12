/* ***
いろいろ操作
*** */

export const ReplaceNS = (NewNSDocument, node, hLang) => {
    const document = NewNSDocument;
    // console.warn(`node.nodeName: ${node.nodeName}`);
    if (node.nodeType == 3) {
        const txt = document.createTextNode(node.textContent);
        node.replaceWith(txt);
        return txt;
    } else if (node.nodeType === 1) {
        const elm = document.createElement(node.tagName.toLowerCase());
        for (const attr of node.getAttributeNames()) {
            elm.setAttribute(attr, node.getAttribute(attr));
        }
        // if (node.matches(`:lang(${hLang})`)) elm.setAttribute('lang', hLang);
        elm.append(...node.childNodes);
        node.replaceWith(elm);
        for (const child of elm.childNodes) {
            ReplaceNS(document, child, hLang);
        }
        return elm;
    }
}

/* ***
End of script
*** */
