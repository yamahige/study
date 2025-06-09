/* ***
脚注
*** */

import { MoveChildren } from "../util.js";

export const FnGroup = (document, back) => {
    const body = document.body;
    const fnGroup = document.createElement('fn-group');
    const title = document.createElement('title');
    title.textContent = '脚注';
    fnGroup.appendChild(title);
    back.appendChild(fnGroup);

    body.querySelectorAll('.fn-text').forEach((fnText) => {
        const fn = document.createElement('fn');
        fn.setAttribute('id', fnText.getAttribute('id'));
        const p = document.createElement('p');
        fn.appendChild(p);
        MoveChildren(document, fnText, p);
        fnGroup.appendChild(fn);
        fnText.remove();
    }
    );
    document.querySelectorAll('.fn-area').forEach(sec => sec.remove());
    return fnGroup
}

/* ***
End of script
*** */