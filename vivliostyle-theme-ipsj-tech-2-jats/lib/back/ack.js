/* ***
謝辞
*** */

export const Ack = (document, back) => {
    const body = document.body;
    // console.log(body);
    body.querySelectorAll('h2.acknowledgement').forEach((h2) => {
        // console.log(h2);
        const ack = document.createElement('ack');
        back.appendChild(ack);
        const title = document.createElement('title');
        title.textContent = h2.textContent;
        h2.before(title);
        const section = h2.parentElement
        section.childNodes.forEach((child) => {
            if (child.nodeType === 3) { // Text node
                ack.appendChild(document.createTextNode(child.textContent));
            } else if (child.nodeType === 1) { // Element node
                ack.appendChild(child);
            }
        });
        h2.remove();
        section.remove();
    });
}

/* ***
End of script
*** */