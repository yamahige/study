/* ***
seciton
*** */

import { Span } from "./span.js";

export const Sec = (document) => {
    document.querySelectorAll('section').forEach((section) => {
        // console.log(section);
        const sec = document.createElement('sec');
        section.after(sec);
        const h = section.querySelector('h1, h2, h3, h4, h5, h6');
        if (h) {
            const title = document.createElement('title');
            title.textContent = h.textContent;
            const hId = h.id;
            // if (hId !== "" && hId.match(/^[!-~]+$/)) title.id = h.id; // idが英数記号のみでできてる
            if (hId !== "") title.id = h.id;
            h.before(title);
            h.remove();
        }
        sec.append(...section.childNodes);
        Array.from(sec.children)
            .filter(child => child.matches('p'))
            .forEach(p => {
                Span(document, p);
            });
        section.remove();
    });
}

/* ***
End of script
*** */