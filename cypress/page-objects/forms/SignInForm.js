class SignInForm {
    
    get emailField() {
        return cy.get('#signinEmail');
    }

    get passwordField() {
        return cy.get('#signinPassword');
    }

    get loginButton() {
        return cy.get('.modal-content .btn-primary');
    }

    get wrongDataMessage() {
        return cy.get('.alert-danger');
    }

    get errorMessage() {
        return cy.get('.invalid-feedback p');
    }

    enterEmail(email) {
        this.emailField.type(email);
    }

    enterPassword(password) {
        this.passwordField.type(password);
    }

    clickLoginButton() {
        this.loginButton.click();
    }

    loginWithCredentials() {
        const email = Cypress.env('EMAIL');
        const password = Cypress.env('PASSWORD');

        this.emailField.type(email);
        this.passwordField.type(password);
        this.loginButton.click();
    }


}

export default new SignInForm();