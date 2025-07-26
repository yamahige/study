/* ***
Label
バイリンガルなcaptionのラベル
*** */


export const Label = (document, root,
    selector,
    prefix,
    suffix,
    idOwnerSelector,
    position="beforebegin") => {
    root.querySelectorAll(selector)
    .forEach((elem, index) => {
        const labelJa = document.createElement('label');
        labelJa.textContent = `${prefix.ja}${index + 1}${suffix.ja}`;
        if (position === "beforebegin") {
            elem.before(labelJa);
        } else if (position === "afterbegin") {
            elem.prepend(labelJa);
        } else if (position === "beforeend") {
            elem.append(labelJa);
        } else {
            console.warn(`Label - Unknown position: ${position}`);
        }
        const titleEn = elem.querySelector('[content-type="title"][xml\\:lang="en"]');
        if (titleEn) {
            const labelEn = document.createElement('named-content');
            labelEn.setAttribute('content-type', 'label');
            labelEn.setAttribute('xml:lang', 'en');
            labelEn.textContent = `${prefix.en} ${index + 1}${suffix.en}`;
            titleEn.prepend(labelEn);
        }
        if (idOwnerSelector) {
            const idOwner = elem.closest(idOwnerSelector);
            if (idOwner && idOwner.id) {
                for (const anchor of root.querySelectorAll(`a[href="#${idOwner.id}"], xref[rid="${idOwner.id}"]`)) {
                    anchor.textContent = `${prefix.ja}${index + 1}${suffix.ja}`;
                }
            } else {
                console.warn(`No id owner found for label: ${elem.tagName}, selector: ${idOwnerSelector}`);
            }
        } else {
            console.warn(`No id owner selector provided for label: ${elem.tagName}`);
        }
    });
}
