/* ***
id属性
JATSではid属性はalphabetで始まらなくてはならない
https://jats.nlm.nih.gov/publishing/tag-library/1.1/attribute/id.html
*** */

export const IdCheck = (document) => {
    // console.warn(`document.defaultView: ${document.defaultView}`);
    // const myWindow = document.defaultView ?? window;
    for (const idHolder of document.querySelectorAll('[id]')) {
        const oldId = idHolder.getAttribute('id');
        if (oldId.match(/^[a-zA-Z]/)) continue;
        // const newId = `id-${myWindow.crypto.randomUUID()}`;
        const newId = idGen(document).next().value;
        if (!newId) {
            console.warn(`IdCheck: id属性の生成に失敗しました。`);
            continue;
        }
        idHolder.setAttribute('id', newId);
        for (const ref of document.querySelectorAll(`[href="#${oldId}"]`)) {
            ref.setAttribute('href', `#${newId}`);
        }
        // idref属性については後で
    }
}

function idGen(document) {
    // 生成済みのidを保持するSetを作成
    const existingIds = new Set(
        Array.from(document.querySelectorAll('[id]'))
            .map(el => el.getAttribute('id'))
    );
    // 生成器関数を返す
    return idGenImpl(existingIds);
}
function* idGenImpl(existingIds) {
    const prefix = 'id-';
    let count = 0;
    // yield prefix + count++;
    while (count < 1000000) {
        // 100万個まで生成
        // それ以上は考えない
        // 生成済みのidと重複しないようにする
        while (existingIds.has(prefix + count)) {
            count++;
        }
        if (count >= 1000000) break; // 安全策
        yield prefix + count++;
    }
    console.warn('idGenImpl: 100万個まで生成しました。');
    return null; // 終了
}