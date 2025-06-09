/* ***
所属機関
*** */

let document;

export const XrefAff = (documentParam, author) => {
    document = documentParam;
    const xrefAff = [];
    const aff = Array.from(author.children)
        .filter(a => a.matches('a.affiref, a.paffiref'))
        .forEach(affiref => {
            const href = affiref.getAttribute('href');
            if (href) {
                // console.log(`href: ${href}`);
                const aff = document.createElement('xref');
                aff.setAttribute('ref-type', "aff");
                aff.setAttribute('rid', href.slice(1));
                xrefAff.push(aff);
            }
        });
    return xrefAff;
};