/* ***
著者
*** */

import { NameJa, NameEn } from "./name.js";
import { Address } from "./address.js";
import { XrefAff } from "./xrefAff.js";

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

        const nameJa = NameJa(document, p);
        if (nameJa) contrib.appendChild(nameJa);

        const nameEn = NameEn(document, authorsEn[index]);
        if (nameEn) contrib.appendChild(nameEn);
        
        const address = Address(document, p);
        if (address) contrib.append(address);

        const aff = XrefAff(document, p);
        // console.log(`aff: ${aff}`)
        if (aff) contrib.append(...aff);

        return contrib;
    });
    authorsEnSec?.remove();
    authorsJaSec?.remove();

    /* emailセクションを削除 */
    const emailSec = document.querySelector('.email-heading');
    // console.log(`emailSec: ${emailSec}`);
    if (emailSec) emailSec.parentElement.remove();

    return contribs;
};