/* ***
Mini page
*** */

export const Minipage = (documentParam) => {
    const document = documentParam;
    for (const mp of document.querySelectorAll('.minipage')) {
        const figGroup = document.createElement('fig-group');
        figGroup.setAttribute('specific-use', mp.getAttribute('class'));
        figGroup.append(...mp.children);
        mp.replaceWith(figGroup);

        // `fig-group`直下に`table-wrap`を置けないため、`fig`で囲む
        console.warn(`Minipage - fig-group has ${figGroup.children.length} children`);
        console.warn(`Minipage - fig-group's children: ${Array.from(figGroup.children).map((c) => c.tagName).join(', ')}`);
        Array.from(figGroup.children)
            .filter((child) => child.matches('figure.table'))
            .forEach((figTable) => {
                console.warn(`Minipage - figure.table found, id = ${figTable.id}`);
                const fig = document.createElement('fig');
                figTable.after(fig);
                fig.append(figTable);
            })
    }
}
