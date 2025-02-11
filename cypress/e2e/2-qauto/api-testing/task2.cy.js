/// <reference types="cypress"/>
import HomePage from "../../../page-objects/pages/HomePage";
import SignInForm from "../../../page-objects/forms/SignInForm";
import ProfilePage from "../../../page-objects/pages/ProfilePage";

describe('Intercept', () => {        
    beforeEach(() => {
        HomePage.openPage();
        HomePage.openSignInFrom();
        SignInForm.loginWithCredentials();
    });

    it('Change user name', () => {

        const profileBody = {
            "status": "ok",
            "data": {
                "userId": 170683,
                "photoFilename": "default-user.png",
                "name": "Polar",
                "lastName": "Bear",
                "dateBirth": "2021-03-17T00:00:00.000Z",
                "country": "Ukraine"
            }
        };

        cy.intercept('GET', '**/profile*', (req) => {
            req.reply(profileBody);
        }).as('getProfile'); 


        ProfilePage.openProfile();
        cy.wait('@getProfile');

        ProfilePage.profileName.should('contain.text', 'Polar Bear');
    });
});