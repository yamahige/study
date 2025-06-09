/* ***
code
*** */

export const Code = (document) => {
    for (const code of document.querySelectorAll('code')) {
        const className = code.getAttribute('class');
        if (className) {
            const comment = document.createComment(`${className} class`);
            code.before(comment);
            code.removeAttribute('class');
        }
    }
}