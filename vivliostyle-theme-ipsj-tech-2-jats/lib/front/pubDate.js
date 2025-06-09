/* ***
発行年月日
*** */

export const PubDate = (document) => {
    const pubDate = document.createElement('pub-date');
    const year = document.createElement('year');
    const month = document.createElement('month');
    const day = document.createElement('day');
    pubDate.append(day, month, year);

    return pubDate;
}