/* ***
論文タイトル
*** */

export const TitleGroup = (document) => {
    const body = document.body;
    const h1 = body.querySelector('h1');
    const titleGroup = document.createElement('title-group');
    // articleMeta.appendChild(titleGroup);
    const articleTitle = document.createElement('article-title');
    articleTitle.textContent = (h1?.textContent ?? '').trim();
    h1?.remove();

    titleGroup.appendChild(articleTitle);
    const h2TitleEn = body.querySelector('h2.title:lang(en)');
    if (!h2TitleEn) {
        return titleGroup;
    }
    const transTitleGroup = document.createElement('trans-title-group');
    transTitleGroup.setAttribute('xml:lang', 'en');
    titleGroup.appendChild(transTitleGroup);
    const transTitle = document.createElement('trans-title');
    transTitle.textContent = h2TitleEn.textContent;
    transTitleGroup.appendChild(transTitle);
    h2TitleEn.remove();

    return titleGroup;
}