/* ***
所属機関
*** */

export const XrefEmail = (document, author) => {
    const xrefEmail = Array.from(author.children)
        .filter(a => a.matches('a.emailref'))
        .map(emailref => {
            const href = emailref.getAttribute('href');
            // console.warn(`XrefEmail - found emailref: "${emailref.textContent}", href: ${href}`);
            if (href) {
                // console.warn(`XrefEmail - href: ${href}`);
                const xref = document.createElement('xref');
                xref.setAttribute('ref-type', "other");
                xref.setAttribute('specific-use', "email");
                xref.setAttribute('rid', href.slice(1));
                return xref;
            }
        });
    return xrefEmail;
};