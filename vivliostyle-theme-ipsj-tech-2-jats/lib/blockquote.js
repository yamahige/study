/* ***
blockquote
*** */

export const Blockquote = (document) => {
    for (const blockquote of document.querySelectorAll('blockquote')) {
        const dispQuote = document.createElement('disp-quote');
        dispQuote.append(...blockquote.childNodes);
        const className = blockquote.getAttribute('class');
        if (className) {
            const comment = document.createComment(`${className} class`);
            dispQuote.before(comment);
        }
        blockquote.replaceWith(dispQuote);
    }
}