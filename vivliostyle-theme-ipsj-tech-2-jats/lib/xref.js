/* ***
記事内部リンク
'#'で始まるhref属性を持っているa要素
*** */

const aClass2XrefMap = {
    'affiref': 'aff',
    'cite': 'bibr',
    'figref': 'fig',
    'fn-call': 'fn',
    'eqref': 'disp-formula',
    'tabref': 'table',
    'secref': 'sec',
    'subsecref': 'sec',
    'chapref': 'chap',
}
const aClass2XrefMapKeys = Object.keys(aClass2XrefMap);

export const Xref = (document) => {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        for (const className of a.classList.values()) {
            // console.log(className);
            if (aClass2XrefMapKeys.includes(className)) {
                const xref = document.createElement('xref');
                xref.setAttribute('ref-type', aClass2XrefMap[className]);
                xref.setAttribute('rid', a.getAttribute('href').replace('#', ''));
                const otherClasses = a.classList;
                otherClasses.remove(className);
                if (otherClasses.length > 0) {
                    xref.setAttribute('specific-use', otherClasses.value);
                }
                a.after(xref);
                a.childNodes.forEach((child) => {
                    if (child.nodeType === 1) {
                        xref.appendChild(child);
                    } else if (child.nodeType === 3) {
                        xref.appendChild(document.createTextNode(child.textContent));
                    }
                });
                a.remove();
                break;
            }
        }
    });
}

/* ***
End of script
*** */