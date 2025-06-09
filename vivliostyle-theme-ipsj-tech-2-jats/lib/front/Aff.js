/* ***
所属機関
*** */

let document;

export const Aff = (documentParam) => {
    document = documentParam;
    const affHeading = document.querySelector('.affiliate-heading');
    // console.log(`affHeading: ${affHeading.textContent}`);
    const affSection = affHeading?.parentElement;
    const affs = Array.from((affSection?.children) ?? [])
        .filter(p => p.matches('.affiliate, .paffiliate'))
        .map(p => {
            const affAlternatives = document.createElement('aff-alternatives');
            affAlternatives.setAttribute('id', p.getAttribute('id'));
            p.childNodes.forEach((child, index) => {
                if (child.nodeType === 3 ||
                    (child.nodeType === 1 && child.tagName.toLowerCase() !== 'br')
                ) {
                    const aff = document.createElement('aff');
                    aff.insertAdjacentHTML('afterbegin',
                        `<institution-wrap><institution>` +
                        `${child.textContent}` +
                        `</institution></institution-wrap>`
                    )
                    if (child.nodeType === 3) {
                        aff.setAttribute('xml:lang', index === 0 ? 'ja' : 'en');
                    } else {
                        aff.setAttribute('xml:lang', child.getAttribute('lang'));
                    }
                    affAlternatives.append(aff);
                }
            });
            p.remove();
            return affAlternatives;
        });
    affSection?.remove();
    return affs;
};