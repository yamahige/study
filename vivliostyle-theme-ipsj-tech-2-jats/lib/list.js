/* ***
リスト
*** */

let DOC;

export const List = (document) => {
    DOC = document;
    document.querySelectorAll('ul, ol').forEach(list => ulol(list));
}

const ulol = (ul) => {
    const document = DOC;
    const list = document.createElement('list');
    ul.after(list);
    if (ul.matches('ul')) {
        list.setAttribute('list-type', 'bullet');
    } else {
        list.setAttribute('list-type', 'roman-lower');
    }
    const id = ul.getAttribute('id');
    if (id) {
        list.setAttribute('id') = ul.getAttribute('id');
    }
    Array.from(ul.children)
        .filter(child => child.matches('li'))
        .forEach(li => {
            const item = document.createElement('list-item');
            li.childNodes.forEach((child) => {
                if (child.nodeType === 3) { // Text node
                    const p = document.createElement('p');
                    p.appendChild(document.createTextNode(child.textContent));
                    item.appendChild(p);
                } else if (child.nodeType === 1) { // Element node
                    if (child.matches("p")) {
                        item.appendChild(child);
                    } else if (child.matches('ul, ol')) {
                        item.appendChild(ulol(ul));
                    }
                    else {
                        const p = document.createElement('p');
                        p.appendChild(child);
                        item.appendChild(p);
                    }
                }
                list.appendChild(item);
                child.remove();
            });
        });
    ul.remove();
    return list;
}
