/* ***
表
id属性はfigure要素かtable要素のどちらかに設定されている。
*** */

export const TableWrap = (document) => {
    document.querySelectorAll('figure.table').forEach(figTab => {
        const tableWrap = document.createElement('table-wrap');
        if (figTab.id) tableWrap.id = figTab.id;
        const caption = document.createElement('caption');
        tableWrap.append(caption);
        Array.from(figTab.children)
            .filter(child => child.matches('figcaption'))
            .forEach(child => {
                for (const gchild of child.children) {
                    const p = document.createElement('p');
                    caption.append(p);
                    p.append(...gchild.childNodes);
                }
                child.remove();
            });
        Array.from(figTab.children)
            .filter(child => child.matches('table'))
            .forEach(table => {
                tableWrap.appendChild(table);
                if (table.id) tableWrap.setAttribute('id', table.id);
                for (const attr of table.getAttributeNames()) {
                    table.removeAttribute(attr);
                }
            });
        figTab.replaceWith(tableWrap);
    });
};