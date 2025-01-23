class HomePage {
    get signUpButton() {
        return cy.get('.btn-primary');
    }

    get signInButton() {
        return cy.get('.header_signin');
    }

    get clickExpensesBtn() {
        return cy.get('body > app-root > app-global-layout > div > div > div > app-panel-layout > div > div > div > div.col-3.d-none.d-lg-block.sidebar-wrapper > nav > a:nth-child(2)');
    }

    openPage() {
        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space')
    }

    openSignUpFrom() {
        this.signUpButton.click();
    }

    openSignInFrom() {
        this.signInButton.click();
    }

    openExpensesButton(){
        this.clickExpensesBtn.click();
    }
}

export default new HomePage();