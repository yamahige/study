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
                if (affiref.matches('a.paffiref')) {
                    aff.setAttribute('specific-use', 'present-affiliation');
                }
                xrefAff.push(aff);
            }
        });
    return xrefAff;
};

export const XrefAffPresent = (document) => {
    const xrefAff = document.querySelectorAll('xref[ref-type="aff"][specific-use="present-affiliation"]');
    // console.warn(`XrefAffPresent - Found ${xrefAff.length} xref elements with present affiliation`);
    xrefAff.forEach((xref) => {
        const txt = xref.textContent;
        if (txt) {
            xref.textContent = `現在${txt}`;
        } else {
            console.warn(`XrefAffPresent - No text content for xref: ${xref.outerHTML}`);
        }
    });
};