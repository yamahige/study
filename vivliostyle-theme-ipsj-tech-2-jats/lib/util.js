/* ***
いろいろ操作
*** */

export const MoveChildren = (document, from, to) => {
    from.childNodes.forEach((child) => {
        if (child.nodeType === 3) { // Text node
            to.appendChild(document.createTextNode(child.textContent));
        } else if (child.nodeType === 1) { // Element node
            to.appendChild(child);
        }
    }
    );
}

export const CopyAttributes = (from, to, attrs = []) => {
    for (const name of from.getAttributeNames()) {
        if (attrs.length === 0 || attrs.includes(name)) {
            const value = from.getAttribute(name);
            to.setAttribute(name, value);
        }
    }
}
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
