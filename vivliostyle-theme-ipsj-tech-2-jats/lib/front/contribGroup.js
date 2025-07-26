/* ***
著者、所属機関
*** */

import { Contrib } from "./contrib.js";

export const ContribGroup = (document) => {
    const body = document.body;
    const contribGroup = document.createElement('contrib-group');
    // articleMeta.appendChild(contribGroup);

    const contribs = Contrib(document);
    if (contribs) contribGroup.append(...contribs);

    return contribGroup;
}
