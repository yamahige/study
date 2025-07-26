/* ***
数式
*** */

let document;

export const Math = (documentParam) => {
    document = documentParam;
    for (const math of document.querySelectorAll('[data-math-typeset="true"]')) {
        const mathContent = math.textContent.trim();
        let formula = null;
        if (mathContent.startsWith('\\(')) {
            formula = inline(math);
        } else if (mathContent.startsWith('$$')) {
            formula = display(math);
        }
        if (math.hasAttribute('id')) {
            formula.id = math.id;
        } else {
            const idHolder = math.closest('.equation.number');
            if (idHolder) {
                formula.id = idHolder.id;
                formula.setAttribute('specific-use', 'equation number');
                idHolder.after(...idHolder.children);
                idHolder.remove();
            }
        }
        math.replaceWith(formula);
    }
}

const inline = (math) => {
    const mathContent = math.textContent.trim();
    // const replace = mathContent.replaceAll(/\\\(/g, '$$$$')
    //     .replaceAll(/\\\)/g, '$$$$');
    const inlineFormula = document.createElement('inline-formula');
    const texMath = document.createElement('tex-math');
    texMath.textContent = mathContent;
    inlineFormula.appendChild(texMath);
    // inlineFormula.textContent = mathContent;
    return inlineFormula;
}

const display = (math) => {
    const mathContent = math.textContent.trim();
    const displayFormula = document.createElement('disp-formula');
    const texMath = document.createElement('tex-math');
    texMath.textContent = mathContent;
    displayFormula.appendChild(texMath);
    // displayFormula.textContent = mathContent;
    return displayFormula;
}
