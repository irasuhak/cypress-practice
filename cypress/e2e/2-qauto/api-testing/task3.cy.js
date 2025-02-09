/// <reference types="cypress"/>


describe('API requests using the plugin', () => {  
    let globalSid;

    beforeEach(() => {
        cy.request('POST', '/api/auth/signin', {
            email: 'irynasuhak+1@gmail.com',
            password: 'Password1!@',
        }).then((response) => {
            const cookie = response.headers['set-cookie'][0];
            const sid = cookie.split(';')[0].split('=')[1];
            globalSid = sid; 

            cy.setCookie('sid', globalSid);  
            cy.getCookie('sid').should('exist');
        })
    })

    afterEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Get user profile data [/api/users/profile]', () => {
        cy.api('GET', '/api/users/profile')
            .then((response) => {
                cy.wrap(response).its('status').should('eq', 200);
                cy.wrap(response.body.data.lastName).should('eq', 'Suhak');
            })
    });

    it('Update user name [/api/users/profile]', () => {
            cy.api({
                method: 'PUT',
                url: '/api/users/profile',
                body: {
                    "name": "Ira"
                },
            }).then((response) => {
                cy.wrap(response).its('status').should('eq', 200);
                cy.wrap(response.body.data.name).should('eq', 'Ira');
            })
    });

    it('Get user setting data [/api/users/settings]', () => {      
        cy.api('GET', '/api/users/settings')
            .then((response) => {
                cy.wrap(response).its('status').should('eq', 200);
                cy.wrap(response.body.data.currency).should('eq','usd');
                cy.wrap(response.body.data.distanceUnits).should('eq', 'km');
            })
    });
});
