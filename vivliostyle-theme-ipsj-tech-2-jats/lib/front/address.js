/* ***
住所
*** */

let document;

export const Address = (documentParam, author) => {
    document = documentParam;
    const address = document.createElement('address');
    const email = Email(author);
    if (email) address.append(email);
    return address;
}

const Email = (author) => {
    let emailAddress = "";
    Array.from(author.children)
        .filter(a => a.matches('a.emailref'))
        .forEach(emailref => {
            const href = emailref.getAttribute('href');
            if (href) {
                emailAddress = document.querySelector(href);
            }
            emailref.remove();
        });
    if (emailAddress) {
        const email = document.createElement('email');
        email.textContent = emailAddress.textContent;
        emailAddress.remove();
        return email;
    }
    return null;
};
