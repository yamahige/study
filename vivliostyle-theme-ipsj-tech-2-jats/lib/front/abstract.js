/* ***
抄録
*** */

export const AbstractJa = (document) => {
    const absHeading = document.querySelector('.abstract:not(:lang(en))');
    const absSec = absHeading?.parentElement;
    const absPs = [...(absSec?.children ?? [])]
        .filter(child => child.matches('p'));
    const abs = document.createElement('abstract');
    abs.setAttribute('xml:lang', 'ja');
    abs.insertAdjacentHTML('afterbegin', '<label>概要:</label>');
    abs.append(...absPs);
    absPs.forEach(p => {
        for (const attr of p.attributes) {
            p.removeAttribute(attr.name);
        }
    });
    absSec?.remove();
    return abs;
}

export const AbstractEn = (document) => {
    const absHeading = document.querySelector('.abstract:lang(en)');
    const absSec = absHeading?.parentElement;
    const absPs = [...(absSec?.children ?? [])]
        .filter(child => child.matches('p'));
    const abs = document.createElement('trans-abstract');
    abs.setAttribute('xml:lang', 'en');
    abs.insertAdjacentHTML('afterbegin', '<label>Abstract:</label>');
    abs.append(...absPs);
    absPs.forEach(p => {
        for (const attr of p.attributes) {
            p.removeAttribute(attr.name);
        }
    });
    absSec?.remove();
    return abs;
}