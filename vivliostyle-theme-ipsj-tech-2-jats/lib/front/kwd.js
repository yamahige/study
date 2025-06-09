/* ***
キーワード
*** */

export const KwdJa = (document) => {
    const kwdHeading = document.querySelector('.keyword:not(:lang(en))');
    const kwdSec = kwdHeading?.parentElement;
    const kwdPs = Array.from((kwdSec?.children ?? []))
        .filter(child => child.matches('p'));
    // const kwds = kwdPs.map(kwd => kwd.textContent.split(/、|,|，/)
    //     .map(kwdS => {
    //         const kwd = document.createElement('kwd');
    //         kwd.textContent = kwdS.trim();
    //         return kwd;
    //     })
    // );
    const kwds = kwdPs.reduce((kwds, kwd) => {
        const aa = kwd.textContent.split(/、|,|，/)
            .map(kwdS => {
                const kwd = document.createElement('kwd');
                kwd.textContent = kwdS.trim();
                return kwd;
            });
        return [kwds, ...aa];
        },
        [] // reduceの初期値
    );

    const kwdGroup = document.createElement('kwd-group')
    kwdGroup.setAttribute('kwd-group-type', 'author');
    kwdGroup.setAttribute('xml:lang', 'ja');
    kwdGroup.append(...kwds);
    kwdSec?.remove();
    return kwdGroup;
};

export const KwdEn = (document) => {
    const kwdHeading = document.querySelector('.keyword:lang(en)');
    const kwdSec = kwdHeading?.parentElement;
    const kwdPs = Array.from((kwdSec?.children) ?? [])
        .filter(child => child.matches('p'));
    const kwds = kwdPs.reduce((kwds, kwd) => [
        kwds, 
        ...kwd.textContent.split(/、|,|，/)
            .map(kwdS => {
                const kwd = document.createElement('kwd');
                kwd.textContent = kwdS.trim();
                return kwd;
            })
        ],
        [] // reduceの初期値
    );

    const kwdGroup = document.createElement('kwd-group')
    kwdGroup.setAttribute('kwd-group-type', 'author');
    kwdGroup.setAttribute('xml:lang', 'en');
    kwdGroup.append(...kwds);
    kwdSec?.remove();
    return kwdGroup;
};
