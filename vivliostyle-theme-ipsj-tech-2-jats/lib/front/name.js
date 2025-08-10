/* ***
名前
*** */

export const Name = (document, pJa=null, pEn=null) => {
    let nameAlt = null;
    const nameJa = pJa ? NameJa(document, pJa) : null;
    if (nameJa) {
        nameAlt = document.createElement('name-alternatives');
        nameAlt.append(nameJa);
    }
    const nameEn = pEn ? NameEn(document, pEn) : null;
    if (nameEn) {
        if (!nameAlt) {
            nameAlt = document.createElement('name-alternatives');
        }
        nameAlt.appendChild(nameEn);
    }
    return nameAlt;
}

const NameJa = (document, p) => {
    const name = document.createElement('name');
    name.setAttribute('xml:lang', 'ja');
    name.setAttribute('name-style', 'eastern');
    const names = p.textContent.split(/ |　/);
    const surname = document.createElement('surname');
    surname.textContent = names[0];
    name.appendChild(surname);
    const givenNames = document.createElement('given-names');
    givenNames.textContent = names.slice(1).join(" ");
    name.appendChild(givenNames);
    return name;
};

const NameEn = (document, p) => {
    const nameEn = document.createElement('name');
    nameEn.setAttribute('xml:lang', 'en');
    nameEn.setAttribute('name-style', 'western');
    const namesEn = p.textContent.split(/ |　/);
    const surnameEn = document.createElement('surname');
    surnameEn.textContent = namesEn.slice(1).join(" ");
    nameEn.appendChild(surnameEn);
    const givenNamesEn = document.createElement('given-names');
    givenNamesEn.textContent = namesEn[0];
    nameEn.appendChild(givenNamesEn);
    return nameEn;
};