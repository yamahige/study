/* ***
code
*** */

export const Code = (document) => {
    for (const code of document.querySelectorAll('code')) {
        const className = code.getAttribute('class');
        if (className) {
            const language = className.replace(/language-/, '').toLowerCase();
            // const comment = document.createComment(`${className} class`);
            // code.before(comment);
            code.setAttribute('language', language);
            code.removeAttribute('class');
        }
    }
}