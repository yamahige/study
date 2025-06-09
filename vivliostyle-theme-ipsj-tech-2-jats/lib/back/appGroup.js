/* ***
付録
backの中にapp-groupは1つ
app-groupの中にappは1つ
付録内のsectionがsecに、h2がtitleに変換済みの可能性あり
*** */

import { CopyAttributes, MoveChildren } from "../util.js";

export const AppGroup = (document) => {
    const appGroup = document.createElement('app-group');

    const h2App = document.querySelector('h2.appendix, title.appendix');
    if (!h2App) {
        console.warn('付録の見出しが見つかりません。元データに付録がなければ問題なし。');
        return null;
    }
    const title = document.createElement('title');
    title.textContent = h2App.textContent;
    h2App.replaceWith(title);

    const secAppTop = title.parentElement;
    appGroup.append(...secAppTop.children);
    secAppTop.replaceWith(appGroup);

    // appGroup直下のsectionのみappに変換
    Array.from(appGroup.children)
        .filter(child => child.matches('section'))
        .forEach(sec => {
            // console.log(sec);
            const app = document.createElement('app');
            sec.after(app);
            const h = sec.querySelector('h1, h2, h3, h4, h5, h6');
            if (h) {
                const title = document.createElement('title');
                title.textContent = h.textContent;
                if (h.id !== "") title.id = h.id; // idが空でなければ設定
                h.replaceWith(title);
            }
            MoveChildren(document, sec, app);
            sec.remove();
        });
    return appGroup;
}

/* ***
End of script
*** */