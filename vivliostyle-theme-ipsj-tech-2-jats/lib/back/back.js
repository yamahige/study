/* ***
back
*** */

import { Ack } from './ack.js';
import { RefList } from './refList.js';
import { AppGroup } from './appGroup.js';
import { FnGroup } from './fnGroup.js';

export const Back = (document) => {
    const body = document.body;
    const back = document.createElement('back');
    body.after(back);

    /* ***
    謝辞
    *** */

    Ack(document, back);

    /* ***
    参考文献
    *** */

    RefList(document, back);

    /* ***
    付録
    *** */

    const appGroup = AppGroup(document);
    if (appGroup) {
        back.append(appGroup);
    } else {
        console.warn('付録が見つかりませんでした。元のデータに付録がなければ問題なし');
    }

    /* ***
    脚注
    *** */

    FnGroup(document, back);

    return back;
}

/* ***
End of script
*** */