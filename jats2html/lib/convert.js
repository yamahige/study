/* ***
変換
*** */

export const Convert = (document) => {
    articleTitle2Title(document);
    wrapLabelTitle(document);
    title2h(document);
    img(document);
    math(document);
    xref(document);
    // jatsBody(document);
}

const articleTitle2Title = (document) => {
    const articleTitle = document.querySelector('article-title');
    if (articleTitle) {
        const title = document.createElement('title');
        title.textContent = articleTitle.textContent;
        document.head.append(title);
    }
}

const title2h = (document) => {
    document.querySelectorAll('jats-body > sec > jats-title-wrap').forEach((title) => {
        const h2 = document.createElement('h2');
        title.after(h2);
        h2.append(...title.childNodes);
        for (const attr of title.attributes) {
            h2.setAttribute(attr.name, attr.value);
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

const math = (document) => {
    document.querySelectorAll('disp-formula, inline-formula').forEach((math) => {
        math.setAttribute('data-math-typeset', 'true');
    });
}

const xref = (document) => {
    document.querySelectorAll('xref').forEach((xref) => {
        const rid = xref.getAttribute('rid');
        if (rid) {
            const href = '#' + rid;
            xref.setAttribute('href', href);
        }
    });
};

/* ***
End of script
*** */