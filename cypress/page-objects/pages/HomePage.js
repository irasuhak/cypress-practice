class HomePage {
    get signUpButton() {
        return cy.get('.btn-primary');
    }

    get signInButton() {
        return cy.get('.header_signin');
    }

    openPage() {
        cy.visit('https://qauto.forstudy.space', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto',
            },
        });
    }

    openSignUpFrom() {
        this.signUpButton.click();
    }

    openSignInFrom() {
        this.signInButton.click();
    }
}

export default new HomePage();