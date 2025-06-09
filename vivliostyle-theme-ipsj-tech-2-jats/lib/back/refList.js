/* ***
参考文献
*** */

let document;

export const RefList = (documentParam, back) => {
    document = documentParam;

    document.querySelectorAll('h2.reference').forEach((h2) => {
        // console.log(h2);
        const refList = document.createElement('ref-list');
        back.appendChild(refList);
        const title = document.createElement('title');
        title.textContent = h2.textContent;
        h2.before(title);
        const section = h2.parentElement;
        Array.from(section.children)
            .filter(child => child.matches('.reference'))
            .forEach((ref) => {
                // console.log(ref);
                const refItem = document.createElement('ref');
                refItem.setAttribute('id', ref.getAttribute('id'));
                refItem.setAttribute('xml:lang', ref.getAttribute('lang'));

                if (0 < Array.from(ref.children).filter(child => child.matches('.book-title')).length) {
                    book(refItem, ref);
                } else {
                    comment(refItem, ref);
                }
                refList.appendChild(refItem);
            });
        h2.remove();
        section.remove();
    }
    );
}

const book = (refItem, ref) => {
    const mixed = document.createElement('mixed-citation');
    mixed.setAttribute('publication-type', 'book');
    refItem.appendChild(mixed);
    const spanTitle = Array.from(ref.children).filter(child => child.matches('.book-title'))[0];
    const title = document.createElement('article-title');
    title.textContent = spanTitle.textContent;
    // spanTitle要素を開くunwrap
    spanTitle.after(...spanTitle.childNodes);
    spanTitle.remove();
    mixed.append(title);
    const comment = document.createElement('comment');
    mixed.append(comment);
    comment.append(...ref.childNodes);
    Array.from(comment.children).filter(child => child.matches('br')).forEach((br) => {
        br.replaceWith(document.createTextNode('\n'));
    });
    return refItem
}

const comment = (refItem, ref) => {
    const mixed = document.createElement('mixed-citation');
    refItem.appendChild(mixed);
    const comment = document.createElement('comment');
    mixed.appendChild(comment);
    comment.append(...ref.childNodes);
    Array.from(comment.children).filter(child => child.matches('br')).forEach((br) => {
        br.replaceWith(document.createTextNode('\n'));
    });
    return refItem;
}

/* ***
End of script
*** */