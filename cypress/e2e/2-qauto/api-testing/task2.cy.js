/// <reference types="cypress"/>
import HomePage from "../../../page-objects/pages/HomePage";
import SignInForm from "../../../page-objects/forms/SignInForm";

describe('Intercept', () => {        
    beforeEach(() => {
        HomePage.openPage();
        HomePage.openSignInFrom();
        SignInForm.loginWithCredentials();
      

        cy.url().should('eq', 'https://qauto.forstudy.space/panel/garage');

        cy.visit('https://qauto.forstudy.space/panel/profile');
    });

    it('Change user name', () => {

        const profileBody = {
            "status": "ok",
            "data": {
                "userId": 170683,
                "photoFilename": "default-user.png",
                "name": "Polar",
                "lastName": "Bear"
            }
        }
        cy.intercept('**//profile', profileBody)
        
    });
    
});