/* ***
著者
*** */

import { Name } from "./name.js";
import { Address } from "./address.js";
import { XrefAff } from "./xrefAff.js";
import { XrefEmail } from "./xrefEmail.js";

export const Contrib = (document) => {
    const body = document.body;
    const authorsEnSec = body.querySelector('h2.author:lang(en)')?.parentElement;
    const authorsJaSec = body.querySelector('h2.author:lang(ja)')?.parentElement;
    const authorsEn = Array.from((authorsEnSec?.children) ?? [])
        .filter(child => child.matches('p'));
    const authorsJa = Array.from((authorsJaSec?.children ?? []))
        .filter(child => child.matches('p'));

    const contribs = Array.from(authorsJa).map((p, index) => {
        // console.log(p);
        const contrib = document.createElement('contrib');
        contrib.setAttribute('contrib-type', 'author');

        const nameAlt = Name(document, p, authorsEn[index]);
        if (nameAlt) contrib.appendChild(nameAlt);

        const aff = XrefAff(document, p);
        // console.log(`aff: ${aff}`)
        if (aff) contrib.append(...aff);

        const email = XrefEmail(document, p);
        if (email) contrib.append(...email);

        // const address = Address(document, p);
        // if (address) contrib.append(address);

        return contrib;
    });
    authorsEnSec?.remove();
    authorsJaSec?.remove();

    return contribs;
};
