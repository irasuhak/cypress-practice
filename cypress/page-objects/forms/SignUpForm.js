class SignUpForm {
    
    get nameField() {
        return cy.get('#signupName');
    }

    get lastNameField() {
        return cy.get('#signupLastName');
    }

    get emailField() {
        return cy.get('#signupEmail');
    }

    get passwordField() {
        return cy.get('#signupPassword');
    }

    get repeatPasswordField() {
        return cy.get('#signupRepeatPassword');
    }

    get registerButton() {
        return cy.get('.modal-footer .btn-primary');
    }

    get errorMessage() {
        return cy.get('.invalid-feedback p');
    }

    enterName(name) {
        this.nameField.type(name);
    }

    enterLastName(lastName) {
        this.lastNameField.type(lastName);
    }

    enterEmail(email) {
        this.emailField.type(email);
    }

    enterPassword(password) {
        this.passwordField.type(password);
    }

    enterRepeatPassword(repeatPassword) {
        this.repeatPasswordField.type(repeatPassword);
    }

    clickRegisterButton() {
        this.registerButton.click();
    }
}

export default new SignUpForm();