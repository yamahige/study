/* ***
変換
*** */

export const Convert = (document) => {
    // jatsTitle(document);
    wrapLabelTitle(document);
    img(document);
    // jatsBody(document);
}

const jatsTitle = (document) => {
    document.querySelectorAll('title').forEach((title) => {
        // console.log(title);
        const jatsTitle = document.createElement('jats-title');
        title.after(jatsTitle);
        jatsTitle.append(...title.childNodes);
        for (const attr of title.attributes) {
            jatsTitle.setAttribute(attr.name, attr.value);
        }
        title.remove();
    });
}

const wrapLabelTitle = (document) => {
    document.querySelectorAll('label + jats-title').forEach((jatsTitle) => {
        const label = jatsTitle.previousElementSibling;
        const titleWrapper = document.createElement('jats-title-wrap');
        jatsTitle.after(titleWrapper);
        titleWrapper.append(label);
        titleWrapper.append(jatsTitle);
    });
}

const jatsBody = (document) => {
    const article = document.querySelector('article');
    const secs = document.querySelectorAll('article > :not(front, back)');
    const jatsBody = document.createElement('jats-body');
    jatsBody.append(...secs);
    const front = article.querySelector('front');
    front.after(jatsBody);
}

const img = (document) => {
    document.querySelectorAll('graphic').forEach((graphic) => { 
        const img = document.createElement('img');
        graphic.after(img);
        img.append(...graphic.childNodes);
        const src = graphic.getAttribute('xlink:href');
        if (src) {
            img.setAttribute('src', `./Graphics/${src}`);
        }
        for (const attr of graphic.attributes) {
            if (attr.name !== 'xlink:href') {
                img.setAttribute(attr.name, attr.value);
            }
        }
        graphic.remove();
    });
}

/* ***
End of script
*** */