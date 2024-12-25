/// <reference types="cypress"/>

describe('Search header elements', () => {

    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto',
            },
        });
    });

    it('find logo', () => {
        cy.get('.header_logo').should('be.visible');
    });

    it('find navigation menu', () => {
        cy.get('.header_nav.d-flex.align-items-center').children();
    });

    it('find login button', () => {
        cy.get('.header-link.-guest').should('exist');
    });

    it('find sign in button', () => {
        cy.get('.header_signin').should('be.visible');
    });
});


describe('Search footer elements', () => {

    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto',
            },
        });
        cy.get('.socials_icon').as('socialIcons');
    });

    it('find facebook icon', () => {
        cy.get('@socialIcons').eq(0).should('exist');
    });

    it('find telegram icon', () => {
        cy.get('@socialIcons').eq(1).should('exist');
    });

    it('find youtube icon', () => {
        cy.get('@socialIcons').eq(2).should('exist');
    });

    it('find instagram icon', () => {
        cy.get('@socialIcons').eq(3).should('exist');
    });

    it('find linkendin icon', () => {
        cy.get('@socialIcons').eq(4).should('exist');
    });

    it('find websites link', () => {
        cy.get('.contacts_link.display-4').contains('ithillel.ua');
    });

    it('find email', () => {
        cy.get('.contacts_link.h4').contains('support@ithillel.ua').should('be.visible');
    });
})