/* ***
図
*** */

import { Minipage } from "./miniPage.js";
import { Caption } from "./caption.js";
import { Label } from "./label.js";

let document = null;

export const Figure = (documentParam) => {
    document = documentParam;
    Minipage(document);
    document.querySelectorAll('figure.fig, figure:has(img)').forEach((figure) => {
        // figure直下のpやimgを削除せずに処理を進めて、最後にfigureごと削除する。
        const fig = document.createElement('fig');
        figure.after(fig);
        if (figure.id) fig.id = figure.id; // fig要素にidを設定

        const classList = figure.classList;
        classList.remove('fig'); // fig要素のclassから'fig'を削除
        if (classList.length > 0) {
            addSpecificUse(fig, classList.value); // class属性をspecific-use属性に変換
        }

        const caps = caption(figure);
        fig.append(...caps);

        const graphics = graphic(figure);
        fig.append(...graphics);

        const others = other(figure);
        fig.append(...others);

        const imgId = Array.from(fig.querySelectorAll('graphic'))
            .filter(g => g.id !== "").map(g => {
                const id = g.id;
                g.removeAttribute('id'); // img要素からidを削除
                // console.log(`図のid: ${id}`);
                return id;
            });
        // console.log(`imgId length: ${imgId.length}`);
        if (0 < imgId.length) fig.id = imgId[0]; // fig要素にidを設定

        colSpan(figure, fig);
        figure.remove();
    });
    // label(document);
    Label(document, document,
        'fig > caption',
        { ja: '図', en: 'Figure' },
        { ja: '', en: '' },
        'fig');
}

const other = (figure) => {
    return Array.from(figure.children)
        .filter(child => !child.matches('img, figcaption, p:has(> img), [style]:has(img)'));
}

const graphic = (figure) => {
    // figure直下でimg以外の要素について、その配下の構造をstyle属性の観点で変更
    Array.from(figure.children)
        .filter(child => child.matches(':has(img)'))
        .map(child => imgHolder(child));

    // figure直下のimg要素でstyle属性付きのものをstyled-contentで囲み、さらにp要素で囲む
    Array.from(figure.children)
        .filter(child => child.matches('img[style]'))
        .forEach(img => {
            const styledContent = styledImg(img);
            const para = document.createElement('p');
            addSpecificUse(para, 'contents'); // 後の組版でdisplay: contentsを適用するための属性
            para.append(styledContent);
            figure.append(para);
        });

    // figure要素の子孫のimgをgraphic要素に変換
    figure.querySelectorAll('img').forEach(img => {
        const graphic = gp(img);
        img.replaceWith(graphic); // img要素をgraphic要素に置き換える
    });

    return Array.from(figure.children)
        .filter(child => child.matches('graphic, :has(graphic)'));
}

const gp = (img) => {
    // img要素を元にgraphic要素を生成して返す。img要素はそのまま残す。
    if (!img) return null; // imgがnullの場合はnullを返す
    const graphic = document.createElement('graphic');
    graphic.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    graphic.setAttribute('xlink:href', img.getAttribute('src'));
    img.removeAttribute('src'); // img要素からsrc属性を削除
    if (img.id) {
        graphic.id = img.id; // graphic要素にidを設定
        img.removeAttribute('id'); // img要素からidを削除
    }
    if (img.hasAttribute('alt')) {
        const altText = document.createElement('alt-text');
        altText.textContent = img.getAttribute('alt');
        img.removeAttribute('alt'); // imgからalt属性を削除
        graphic.append(altText);
    }
    if (img.hasAttribute('class')) {
        addSpecificUse(graphic, img.getAttribute('class'));
        img.removeAttribute('class'); // imgからclass属性を削除
    }
    // for (const attr of img.getAttributeNames()) {
    //     graphic.setAttribute(attr, img.getAttribute(attr));
    // }
    return graphic;
}

const imgHolder = (para) => {
    // para要素の配下を加工するがpara要素自体はそのまま返す
    if (para.matches('[style]')) {
        // 自身にstyle属性がある場合、styled-contentを作成してp要素の子としてstyle属性を移管する
        // para[style] > para's childrNodes
        // para > styled-content[style] > para's childNodes
        const styledContent = document.createElement('styled-content');
        styledContent.setAttribute('style', para.getAttribute('style'));
        styledContent.append(...para.childNodes);
        para.removeAttribute('style'); // 元のparaからstyle属性を削除
        addSpecificUse(para, 'contents'); // 後の組版でdisplay: contentsを適用するための属性
        para.append(styledContent);
    }
    // para要素の子孫にstyle属性を持つimgがある場合、styled-contentを作成してimg要素の親として、styled-contentにimgのstyle属性を移管する
    // para img[style] 直下とは限らない
    // para styled-content[style] > img graphicへの変換は、ここではしない
    para.querySelectorAll('img[style]').forEach(img => {
        const styledContent = styledImg(img);
        addSpecificUse(para, 'contents'); // 後の組版でdisplay: contentsを適用するための属性
        para.append(styledContent);
    });

    return para;
}

const addSpecificUse = (element, specificUse) => {
    // elementのspecific-use属性をclass属性のように扱い、既存の値に追加する
    if (element.hasAttribute('specific-use')) {
        const existingValue = element.getAttribute('specific-use');
        if (!existingValue.split(' ').includes(specificUse)) {
            element.setAttribute('specific-use', existingValue.trim() + ' ' + specificUse);
        }
    } else {
        element.setAttribute('specific-use', specificUse);
    }
}

const styledImg = (img) => {
    const styledContent = document.createElement('styled-content');
    styledContent.setAttribute('style', img.getAttribute('style'));
    img.removeAttribute('style'); // imgからstyle属性を削除
    styledContent.append(img);
    return styledContent;
}

const caption = (figure) => {
    return Array.from(figure.children)
        .filter(child => child.matches('figcaption'))
        .map(child => Caption(document, child));
}

const label = (document) => {
    const figures = document.querySelectorAll('fig');
    figures.forEach((figure, index) => {
        const figcaption = figure.querySelector('caption');
        if (!figcaption) return; // figcaptionがない場合はスキップ
        const labelJa = document.createElement('label');
        labelJa.textContent = `図${index + 1}`;
        figcaption.before(labelJa);
        const titleEn = figcaption.querySelector('[content-type="title"][xml\:lang="en"]');
        if (titleEn) {
            const labelEn = document.createElement('named-content');
            labelEn.setAttribute('content-type', 'label');
            labelEn.setAttribute('xml:lang', 'en');
            labelEn.textContent = `Figure ${index + 1}`;
            titleEn.prepend(labelEn);
        }
        for (const anchor of document.querySelectorAll(`a[href="#${figure.id}"]`)) {
            anchor.textContent = `図${index + 1}`;
        }
    });
}

const colSpan = (figure, fig) => {
    if ( figure.matches('.col-span-2') ||
        fig.matches(':has(> graphic[specific-use~="col-span-2"])') ) {
        addSpecificUse(fig, 'col-span-2');
    }
}

/* ***
End of script
*** */