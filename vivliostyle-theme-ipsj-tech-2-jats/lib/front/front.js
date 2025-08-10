/* ***
front
*** */

import { TitleGroup } from './titleGroup.js';
import { ContribGroup } from './contribGroup.js';
import { KwdJa, KwdEn } from './kwd.js';
import { AbstractEn, AbstractJa } from './abstract.js';
import { PubDate } from './pubDate.js';
import { Aff } from "./Aff.js";
import { Label } from "../label.js";
import { Email } from './email.js';
import { XrefAffPresent } from './xrefAff.js';

export const Front = (document) => {
    const body = document.body;
    const front = document.createElement('front');

    {
        /* journal meta */

        const journalMeta = document.createElement('journal-meta');
        front.append(journalMeta);

        const journalId = document.createElement('journal-id');
        journalId.setAttribute('journal-id-type', 'j-stage');
        journalMeta.append(journalId);

        const issn = document.createElement('issn');
        issn.setAttribute('pub-type', 'ppub');
        issn.textContent = '仮のISSN'; // 仮のISSN
        journalMeta.append(issn);
    }

    {

        /* article meta */

        const articleMeta = document.createElement('article-meta');
        front.appendChild(articleMeta);

        /* title group */
        const titleGroup = TitleGroup(document);
        articleMeta.appendChild(titleGroup);

        /* contrib group */
        const contribGroup = ContribGroup(document);
        articleMeta.appendChild(contribGroup);

        const affAlternatives = Aff(document);
        if (affAlternatives) articleMeta.append(...affAlternatives);
        // contrib-groupの範囲で番号を振るために、このタイミングでlabelを追加する
        Label(document, articleMeta,
            'aff-alternatives > aff:first-child',
            { ja: '', en: '' },
            { ja: '', en: '' },
            'aff-alternatives',
            'afterbegin');
        // 現所属を示すxrefのテキストを更新
        XrefAffPresent(articleMeta);

        /* pub date */
        const pubDate = PubDate(document);
        articleMeta.appendChild(pubDate);

        /* email */
        const emails = Email(document);
        if (emails.length > 0) {
            articleMeta.append(...emails);
        }
        /* emailセクションを削除 */
        const emailSec = document.querySelector('.email-heading');
        console.warn(`emailSec: ${emailSec.textContent}`);
        if (emailSec) emailSec.parentElement.remove();

        /* abstract */
        const absJa = AbstractJa(document);
        articleMeta.append(absJa);
        const absEn = AbstractEn(document);
        articleMeta.append(absEn);

        /* kwd group */
        const kwdGroupJa = KwdJa(document);
        articleMeta.append(kwdGroupJa);
        const kwdGroupEn = KwdEn(document);
        articleMeta.append(kwdGroupEn);

        /* headerを削除 */
        document.querySelector('header')?.remove();
    }
    return front
}

/* ***
End of script
*** */