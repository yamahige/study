/* ***
名前
*** */

let document;

export const NameJa = (document, p) => {
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

export const NameEn = (document, p) => {
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