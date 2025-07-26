/* ***
リスト
*** */

let document;

export const List = (documentP) => {
    document = documentP;
    document.querySelectorAll('ul, ol').forEach(list => ulol(list));
}

const ulol = (ul) => {
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
        .forEach((li, index) => {
            const item = document.createElement('list-item');
            if (Array.from(li.childNodes)
                .some(node => node.nodeType === 3 && node.textContent.trim() !== "")) {
                const p = document.createElement('p');
                p.append(...li.childNodes);
                item.append(p);
            } else {
                item.append(...li.children);
            }
            const label = document.createElement('label');
            if (ul.matches('ol') && label) {
                label.textContent = `（${index + 1}）`;
            } else {
                label.textContent = "\u25CF"; // Unicode bullet character
            }
            item.prepend(label);
            list.append(item);
        });
    ul.remove();
    return list;
}
