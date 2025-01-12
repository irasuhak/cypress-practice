/// <reference types="cypress"/>
import HomePage from "../../page-objects/pages/HomePage";
import SignInForm from "../../page-objects/forms/SignInForm";

describe('Login with POM', () => {        
    beforeEach(() => {
        HomePage.openPage();
        HomePage.openSignInFrom();
    });

    it('successful login', () => {
        SignInForm.enterEmail('irynasuhak+1@gmail.com');
        SignInForm.enterPassword('Password1!@');
        SignInForm.clickLoginButton();
        
        cy.contains('Garage')
        .should('be.visible');
    });
    
});