/* ***
脚注
*** */

import { Label } from '../label.js';

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
        p.append(...fnText.childNodes);
        fnGroup.appendChild(fn);
        fnText.remove();
    }
    );
    document.querySelectorAll('.fn-area').forEach(sec => sec.remove());

    Label(document, document,
        'fn-group > fn',
        { ja: '*', en: 'Note' },
        { ja: ')', en: ')' },
        'fn',
        "afterbegin");
    return fnGroup
}

export const FnGroupNG = (document) => {
    document.querySelectorAll('.fn-area')
        .forEach(sec => {
            console.warn(`FnGroup - fn-area: ${sec.textContent.trim().slice(0, 20)}...`);
            const fnGroup = document.createElement('fn-group');
            sec.querySelectorAll('.fn-text')
                .forEach(fnText => {
                    console.warn(`FnGroup - fn-text: ${fnText.getAttribute('id')}`);
                    const fn = document.createElement('fn');
                    fn.setAttribute('id', fnText.getAttribute('id'));
                    const p = document.createElement('p');
                    fn.appendChild(p);
                    p.append(...fnText.childNodes);
                    fnGroup.appendChild(fn);
                    fnText.remove();
                });
            sec.replaceWith(fnGroup);
    });

    Label(document, document,
        'fn-group > fn',
        { ja: '*', en: '*' },
        { ja: ')', en: ')' },
        'fn',
        "afterbegin");
}

/* ***
End of script
*** */