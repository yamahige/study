/* ***
Caption
日英2つのタイトルを含むキャプション
*** */

export const Caption = (document, originalCaption) => {
    const caption = document.createElement('caption');
    if (originalCaption.children.length === 0) {
        const title = document.createElement('title');
        title.textContent = originalCaption.textContent.trim();
        caption.appendChild(title);
        originalCaption.replaceWith(caption);
        return caption;
    }
    Array.from(originalCaption.children).forEach((gchild, index) => {
        if (index === 0) {
            // 最初の要素がfigcaptionのタイトルとする
            const title = document.createElement('title');
            title.append(...gchild.childNodes);
            caption.appendChild(title);
        } else if (index === 1 && gchild.matches(':lang(en)')) {
            // 2番目の英語の要素が英語のキャプションとする
            const titleEn = document.createElement('p');
            titleEn.setAttribute('content-type', 'title');
            titleEn.setAttribute('xml:lang', 'en');
            titleEn.append(...gchild.childNodes);
            caption.appendChild(titleEn);
        } else {
            // その他の要素はそのままキャプションに追加
            const p = document.createElement('p');
            p.append(...gchild.childNodes);
            caption.append(p);
        }
    });
    originalCaption.replaceWith(caption);
    return caption;
}