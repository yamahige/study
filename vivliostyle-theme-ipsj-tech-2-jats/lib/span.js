/* ***
文字修飾
*** */

const getComputedStyle = (span) => {
    return span.style;
};

export const Span = (document) => {
    em(document);
    bold(document);
    // italic(document);
    strike(document);
    br(document);
    namedStyledContent(document);
    // Array.from(element.children)
    //     .filter(child => child.matches('span'))
    //     .forEach(span => {
    //         // console.log(span.textContent);
    //         fontWeight(span);
    //     });
}

const namedStyledContent = (document) => {
    document.querySelectorAll('span')
        .forEach(s => {
            let namedStyledContent;
            if (s.className) {
                namedStyledContent = document.createElement('named-content');
                namedStyledContent.setAttribute('content-type', s.className);
            } else {
               namedStyledContent = document.createElement('styled-content');
            }
            const style = s.getAttribute('style');
            if (style) namedStyledContent.setAttribute('style', style);
            namedStyledContent.append(...s.childNodes);
            s.replaceWith(namedStyledContent);
        })
}

const em = (document) => {
    document.querySelectorAll('em')
        .forEach(e => {
            const namedContent = document.createElement('named-content');
            namedContent.append(...e.childNodes);
            namedContent.setAttribute('content-type', 'em');
            e.replaceWith(namedContent);
        });
};

const bold = (document) => {
    document.querySelectorAll('strong')
        .forEach(s => {
            const bold = document.createElement('bold');
            bold.textContent = s.textContent;
            s.after(bold);
            s.remove();
        });
};

// const italic = (document) => {
//     document.querySelectorAll('em')
//         .forEach(e => {
//             const italic = document.createElement('italic');
//             italic.textContent = e.textContent;
//             e.after(italic);
//             e.remove();
//         });
// };

const strike = (document) => {
    document.querySelectorAll('del')
        .forEach(s => {
            const strike = document.createElement('strike');
            strike.textContent = s.textContent;
            s.after(strike);
            s.remove();
        });
};

const br = (document) => {
    document.querySelectorAll('br')
        .forEach(br => {
            br.insertAdjacentHTML('afterend', '\n');
            br.remove();
        });
};

// const fontWeight = (span) => {
//     const computedStyle = getComputedStyle(span);
//     const fontWeightS = computedStyle.fontWeight;
//     // console.log(`fontWeight = ${fontWeightS}`);
//     const fontWeight = Number(fontWeightS);
//     if (fontWeightS === "bold" || fontWeight && 400 < fontWeight) {
//         const bold = document.createElement('bold');
//         span.after(bold);
//         bold.textContent = span.textContent;
//         span.remove();
//     }
// };