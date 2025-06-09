/* ***
図
*** */

import { MoveChildren } from "./util.js";

let document = null;

export const Figure = (documentParam) => {
    document = documentParam;
    unwrapMinipage();
    document.querySelectorAll('figure.fig, figure:has(> img)').forEach((figure) => {
        const fig = document.createElement('fig');
        figure.after(fig);
        if (figure.id) fig.id = figure.id; // fig要素にidを設定

        const caps = caption(figure);
        fig.append(...caps);

        const graphics = graphic(figure);
        fig.append(...graphics);
        const imgId = graphics.filter(g => g.id !== "").map(g => {
                const id = g.id;
                g.removeAttribute('id'); // img要素からidを削除
                // console.log(`図のid: ${id}`);
                return id;
            });
        // console.log(`imgId length: ${imgId.length}`);
        if (0 < imgId.length) fig.id = imgId[0]; // fig要素にidを設定

        figure.remove();
    });
}

const graphic = (figure) => {
    const gp = (img) => {
        const graphic = document.createElement('graphic');
        graphic.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        graphic.setAttribute('xlink:href', img.getAttribute('src'));
        if (img.id) graphic.id = img.id; // graphic要素にidを設定
        const altText = document.createElement('alt-text');
        if (img.hasAttribute('alt')) {
            altText.textContent = img.getAttribute('alt');
        }
        graphic.append(altText);
        return graphic;
    }

    const gps = Array.from(figure.children)
        .filter(child => child.matches('img'))
        .map(img => {
            return gp(img);
        });

    return Array.from(figure.children)
        .filter(child => child.matches('p:has(> img)'))
        .reduce((gs, p) => {
            Array.from(p.children)
                .filter(child => child.matches('img'))
                .forEach(img => gs.push(gp(img)));
            return gs;
        }, gps);
}

const caption = (figure) => {
    return Array.from(figure.children)
        .filter(child => child.matches('figcaption'))
        .map(child => {
            const caption = document.createElement('caption');
            for (const gchild of child.childNodes) {
                if (gchild.nodeType === 3 && gchild.textContent.trim() != "") { // Text node
                    const p = document.createElement('p');
                    caption.appendChild(p);
                    p.textContent = gchild.textContent;
                }
                else if (gchild.nodeType === 1) { // Element node
                    const p = document.createElement('p');
                    caption.append(p);
                    MoveChildren(document, gchild, p);
                }
            }
            child.remove();
            return caption;
        });
}

const unwrapMinipage = () => {
    for (const mp of document.querySelectorAll('.minipage')) {
        // console.log(`minipage: ${mp.innerHTML}, # of children: ${mp.children.length}`)
        mp.after(...mp.children);
        mp.remove();
    }
}

/* ***
End of script
*** */