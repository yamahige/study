/* ***
文字修飾
*** */

var document;
const getComputedStyle = (span) => {
    return span.style;
};

export const Span = (documentP, element) => {
    document = documentP;
    bold(element);
    italic(element);
    strike(element);
    br(element);
    namedStyledContent(element);
    // Array.from(element.children)
    //     .filter(child => child.matches('span'))
    //     .forEach(span => {
    //         // console.log(span.textContent);
    //         fontWeight(span);
    //     });
}

const namedStyledContent = (span) => {
    Array.from(span.children)
        .filter(child => child.matches('span'))
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
            s.after(namedStyledContent);
            s.remove();
        })
}

const bold = (span) => {
    Array.from(span.children)
        .filter(child => child.matches('strong'))
        .forEach(s => {
            const bold = document.createElement('bold');
            bold.textContent = s.textContent;
            s.after(bold);
            s.remove();
        });
};

const italic = (span) => {
    Array.from(span.children)
        .filter(child => child.matches('em'))
        .forEach(e => {
            const italic = document.createElement('italic');
            italic.textContent = e.textContent;
            e.after(italic);
            e.remove();
        });
};

const strike = (span) => {
    Array.from(span.children)
        .filter(child => child.matches('del'))
        .forEach(s => {
            const strike = document.createElement('strike');
            strike.textContent = s.textContent;
            s.after(strike);
            s.remove();
        });
};

const br = (span) => {
    Array.from(span.children)
        .filter(child => child.matches('br'))
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