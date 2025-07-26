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
        // Array.from(sec.children)
        //     .filter(child => child.matches('p'))
        //     .forEach(p => {
        //         Span(document, p);
        //     });
        section.remove();
    });
    label(document);
}

const label = (document) => {
    document.querySelectorAll('body > sec').forEach((sec, index) => {
        const title = sec.querySelector('title');
        if (!title) return; // titleがない場合はスキップ
        const label = document.createElement('label');
        const subPrefix = `${index + 1}`;
        label.textContent = `${subPrefix}.`;
        title.before(label);
        Array.from(sec.children)
            .filter(child => child.matches('sec'))
            .forEach((sec, index) => {
                // 再帰的に子セクションのラベルを作成
                subSecLabel(document, sec, subPrefix, index);
            });
    });
}

const subSecLabel = (document, sec, prefix, index) => {
    const title = sec.querySelector('title');
    if (!title) return;
    const label = document.createElement('label');
    const subPrefix = `${prefix}.${index + 1}`;
    label.textContent = `${subPrefix}`;
    title.before(label);
    // 再帰的に子セクションのラベルを作成
    Array.from(sec.children)
        .filter(child => child.matches('sec'))
        .forEach((childSec, childIndex) => {
            subSecLabel(document, childSec, subPrefix, childIndex);
        });
};

/* ***
End of script
*** */