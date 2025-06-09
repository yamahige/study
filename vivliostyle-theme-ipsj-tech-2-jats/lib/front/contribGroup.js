/* ***
著者、所属機関
*** */

import { Aff } from "./Aff.js";
import { Contrib } from "./contrib.js";

export const ContribGroup = (document) => {
    const body = document.body;
    const contribGroup = document.createElement('contrib-group');
    // articleMeta.appendChild(contribGroup);

    const contribs = Contrib(document);
    if (contribs) contribGroup.append(...contribs);

    const affAlternatives = Aff(document);
    if (affAlternatives) contribGroup.append(...affAlternatives);

    return contribGroup;
}
