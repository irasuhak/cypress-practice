/// <reference types="cypress"/>
import HomePage from "../../page-objects/pages/HomePage";
import SignUpForm from "../../page-objects/forms/SignUpForm";


const selectors = {
    nameField: '#signupName',
    lastNameField: '#signupLastName',
    emailField: '#signupEmail',
    passwordField: '#signupPassword',
    repeatPasswordField: '#signupRepeatPassword',
    registerButton: '.modal-footer .btn-primary',
    errorMessage: '.invalid-feedback p',
};

const errorMessages = {
    nameRequired: 'Name required',
    nameInvalid: 'Name is invalid',
    nameLength: 'Name has to be from 2 to 20 characters long',
    lastNameRequired: 'Last name required',
    lastNameInvalid: 'Last name is invalid',
    lastNameLength: 'Last name has to be from 2 to 20 characters long',
    emailRequired: 'Email required',
    emailInvalid: 'Email is incorrect',
    passwordRequired: 'Password required',
    passwordInvalid: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
    repeatPasswordRequired: 'Re-enter password required',
    passwordsMismatch: 'Passwords do not match',
  };

const randomEmail = `irynasuhak+testUser+${Date.now()}@gmail.com`;
const password = 'Password1!@'

function checkErrorStyle(selector) {
    cy.get(selector)
    .should('have.css', 'border-color', 'rgb(220, 53, 69)');
}

function checkValidStyle(selector) {
    cy.get(selector)
    .should('have.css', 'border-color', 'rgb(206, 212, 218)');
}


describe('Registration Form validation', () => {        
    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto',
            },
        });
    });

    describe('Name field validation', () => {
        it('validate empty name field', () => {
            cy.get(selectors.nameField)
            .focus()
            .blur();
        
            cy.get(selectors.errorMessage)
            .should('contain.text', errorMessages.nameRequired)
            .should('be.visible');
        
            checkErrorStyle(selectors.nameField);
        });
        
        it('validate wrong data for name field', () => {
            cy.get(selectors.nameField)
            .type('Миколай')
            .blur();
        
            cy.get(selectors.errorMessage)
            .should('have.text', errorMessages.nameInvalid)
            .should('be.visible');
        
            checkErrorStyle(selectors.nameField);
        });
        
        it('validate name length less than 2 characters', () => {
            cy.get(selectors.nameField)
            .type('I')
            .blur();
            
            cy.get(selectors.errorMessage)
            .should('have.text', errorMessages.nameLength)
            .should('be.visible');
        
            checkErrorStyle(selectors.nameField);
        });
        
        it('validate name length more than 20 characters', () => {
            cy.get(selectors.nameField)
            .type('Ira'.repeat(7))
            .blur();
            
            cy.get(selectors.errorMessage)
            .should('have.text', errorMessages.nameLength)
            .should('be.visible');
        
            checkErrorStyle(selectors.nameField);
        });
        
        it('validate name', () => {
            cy.get(selectors.nameField)
            .type('Rosa')
            .blur();
        
            cy.get(selectors.errorMessage)
            .should('not.exist');
        
            checkValidStyle(selectors.nameField);
        });
    });

    describe('Last name field validation', () => {
        it('validate empty last name field', () => {
            cy.get(selectors.lastNameField)
            .focus()
            .blur();
        
            cy.get(selectors.errorMessage)
            .should('contain.text', errorMessages.lastNameRequired)
            .should('be.visible');
        
            checkErrorStyle(selectors.lastNameField);
        });
        
        it('validate wrong data for last name field', () => {
            cy.get(selectors.lastNameField)
            .type('Гусько')
            .blur();
        
            cy.get(selectors.errorMessage)
            .should('have.text', errorMessages.lastNameInvalid)
            .should('be.visible');
        
            checkErrorStyle(selectors.lastNameField);
        });
        
        it('validate last name length less than 2 characters', () => {
            cy.get(selectors.lastNameField)
            .type('H')
            .blur();
            
            cy.get(selectors.errorMessage)
            .should('have.text', errorMessages.lastNameLength)
            .should('be.visible');
        
            checkErrorStyle(selectors.lastNameField);
        });
        
        it('validate last name length more than 20 characters', () => {
            cy.get(selectors.lastNameField)
            .type('Loa'.repeat(7))
            .blur();
            
            cy.get(selectors.errorMessage)
            .should('have.text', errorMessages.lastNameLength)
            .should('be.visible');
        
            checkErrorStyle(selectors.lastNameField);
        });
        
        it('validate right last name', () => {
            cy.get(selectors.lastNameField)
            .type('Smith')
            .blur();
        
            cy.get(selectors.errorMessage)
            .should('not.exist')
        
            checkValidStyle(selectors.lastNameField);
        });   
    });

    describe('Email field validation', () => {
        it('validate empty email field', () => {
            cy.get(selectors.emailField)
            .focus()
            .blur();
        
            cy.get(selectors.errorMessage)
            .should('contain.text', errorMessages.emailRequired)
            .should('be.visible');
        
            checkErrorStyle(selectors.emailField);
        });
        
        it('validate wrong data for email field', () => {
            cy.get(selectors.emailField)
            .focus()
            .type('irynasu@')
            .blur();
        
            cy.get(selectors.errorMessage)
            .should('contain.text', errorMessages.emailInvalid)
            .should('be.visible');
        
            checkErrorStyle(selectors.emailField);
        });
        
        it('validate right data for email field', () => {
            cy.get(selectors.emailField)
            .focus()
            .type(randomEmail)
            .blur();
        
            cy.get(selectors.errorMessage)
            .should('not.exist');
        
            checkValidStyle(selectors.emailField)
        });
    });

    describe('Password field validation', () => {
        it('validate empty password field', () => {
            cy.get(selectors.passwordField)
            .focus()
            .blur();
        
            cy.get(selectors.errorMessage)
            .should('contain.text', errorMessages.passwordRequired)
            .should('be.visible');
        
            checkErrorStyle(selectors.passwordField);
        });
        
        it('validate password length less than 8 characters', () => {
            cy.get(selectors.passwordField)
            .type('Pass1')
            .blur();
            
            cy.get(selectors.errorMessage)
            .should('have.text', errorMessages.passwordInvalid)
            .should('be.visible');
        
            checkErrorStyle(selectors.passwordField);
        });
        
        it('validate password length more than 15 characters', () => {
            cy.get(selectors.passwordField)
            .type('Pass1!'.repeat(3))
            .blur();
            
            cy.get(selectors.errorMessage)
            .should('have.text', errorMessages.passwordInvalid)
            .should('be.visible');
        
            checkErrorStyle(selectors.passwordField);
        });
        
        it('validate password without any capital character', () => {
            cy.get(selectors.passwordField)
            .type('password55')
            .blur();
            
            cy.get(selectors.errorMessage)
            .should('have.text', errorMessages.passwordInvalid)
            .should('be.visible');
        
            checkErrorStyle(selectors.passwordField);
        });
        
        it('validate password without any small character', () => {
            cy.get(selectors.passwordField)
            .type('PASSWORD55')
            .blur();
            
            cy.get(selectors.errorMessage)
            .should('have.text', errorMessages.passwordInvalid)
            .should('be.visible');
        
            checkErrorStyle(selectors.passwordField);
        });
        
        it('validate password without any integers', () => {
            cy.get(selectors.passwordField)
            .type('Password')
            .blur();
            
            cy.get(selectors.errorMessage)
            .should('have.text', errorMessages.passwordInvalid)
            .should('be.visible');
        
            checkErrorStyle(selectors.passwordField);
        });
        
        it('validate right password', () => {
            cy.get(selectors.passwordField)
            .type(password)
            .blur();
        
            cy.get(selectors.errorMessage)
            .should('not.exist')
        
            checkValidStyle(selectors.passwordField);
        });    
    });

    describe('Re-enter password field validation', () => {
        it('validate empty re-enter password field', () => {
            cy.get(selectors.repeatPasswordField)
            .focus()
            .blur();
        
            cy.get(selectors.errorMessage)
            .should('contain.text', errorMessages.repeatPasswordRequired)
            .should('be.visible');
        
            cy.get(selectors.repeatPasswordField);
        });
        
        it('validate passwords do not match', () => {
            cy.get(selectors.passwordField)
            .type(password)
            .blur();
        
            cy.get(selectors.repeatPasswordField)
            .type('Passwordd1!')
            .blur();
        
            cy.get(selectors.errorMessage)
            .should('contain.text', errorMessages.passwordsMismatch)
            .should('be.visible');
        
            checkErrorStyle(selectors.repeatPasswordField);
        });
        
        it('validate passwords match', () => {
            cy.get(selectors.passwordField)
            .type(password)
        
            cy.get(selectors.repeatPasswordField)
            .type(password)
            .blur();
        
            cy.get(selectors.errorMessage)
            .should('not.exist')
        
            checkValidStyle(selectors.passwordField);
        });
    });

    describe('Full registation validation', () => {
        it('validate register button is disabled', () => {
            cy.get(selectors.nameField)
            .focus()
            .blur();
        
            cy.get(selectors.lastNameField)
            .focus()
            .blur();
        
            cy.get(selectors.emailField)
            .focus()
            .blur();
            
            cy.get(selectors.passwordField)
            .focus()
            .blur();
        
            cy.get(selectors.repeatPasswordField)
            .focus()
            .blur();
        
            cy.get(selectors.registerButton)
            .should('be.disabled');
        });
        
        it('successful registration', () => {
            cy.get(selectors.nameField)
            .type('Iryna');
        
            cy.get(selectors.lastNameField)
            .type('Suhak');
        
        
            cy.get(selectors.emailField)
            .type(randomEmail);
            
            cy.get(selectors.passwordField)
            .type(password);
        
            cy.get(selectors.repeatPasswordField)
            .type(password);
        
            cy.get(selectors.registerButton)
            .click();
        
            cy.contains('Garage')
            .should('be.visible');
        });
    });
});


describe.only('Registration with POM', () => {        
    beforeEach(() => {
        HomePage.openPage();
        HomePage.openSignUpFrom();
    });

    it('successful registration', () => {
        SignUpForm.enterName('Iryna');
        SignUpForm.enterLastName('Suhak');
        SignUpForm.enterEmail(randomEmail);
        SignUpForm.enterPassword(password);
        SignUpForm.enterRepeatPassword('Password1!@');
        SignUpForm.clickRegisterButton();
        
        cy.contains('Garage')
        .should('be.visible');
    });
    
});