/* ***
email
*** */

export const Email = (document) => {
    return Array.from(document.querySelectorAll('.email'))
        .map(emailP => {
            // console.warn(`Email - found email element: ${emailP.textContent}`);
            const email = document.createElement('email');
            if (emailP.id) {
                email.setAttribute('id', emailP.id);
            }
            email.textContent = emailP.textContent;
            emailP.replaceWith(email);
            return email;
        });
};
