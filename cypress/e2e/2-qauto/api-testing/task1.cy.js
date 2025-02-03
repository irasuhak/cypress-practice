/// <reference types="cypress"/>
import HomePage from "../../../page-objects/pages/HomePage";
import SignInForm from "../../../page-objects/forms/SignInForm";

describe('Intercept', () => {        
    beforeEach(() => {
    });

    it('Get all cars brands [/api/cars/brands]', () => {
        cy.request('GET', '/api/cars/brands')
            .then((response) => {
                cy.log(JSON.stringify(response.body.data));
                
                expect(response.status).to.eq(200);
                expect(response.body.data.length).to.eq(5);
                
                const expectedBrands = ["Audi", "BMW", "Ford", "Porsche", "Fiat"];
                const actualBrands = response.body.data.map((brand) => brand.title);
                expect(actualBrands).to.deep.eq(expectedBrands);
                
                response.body.data.forEach((brand) => {
                    expect(brand).to.have.all.keys('id', 'title', 'logoFilename');
                    expect(brand.id).to.be.a('number');
                    expect(brand.title).to.be.a('string');
                    expect(brand.logoFilename).to.be.a('string');
                });
            })

    });

    it('Get car brand by id [/api/cars/brands/{id}]', () => {
        cy.request('GET', '/api/cars/brands/4')
            .then((response) => {
                cy.log(JSON.stringify(response.body.data));
                expect(response.status).to.eq(200);
                expect(response.body.data.id).to.eq(4);
                expect(response.body.data.title).to.eq('Porsche');
                expect(response.body.data.logoFilename).to.eq('porsche.png');
            })
    });

    it('Get all cars models [/api/cars/models]', () => {
        cy.request('GET', '/api/cars/models')
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.data).to.be.an('array').that.is.not.empty;
                cy.wrap(response.body.data.length).should('be.greaterThan', 20);

                response.body.data.forEach((model) => {
                    expect(model).to.have.all.keys('id', 'carBrandId', 'title');
                    expect(model.id).to.be.a('number');
                    expect(model.carBrandId).to.be.a('number');
                    expect(model.title).to.be.a('string');
                });
            });
    })

    it.only('Get car model by id [/api/cars/models/{id}]', () => {
        cy.request('GET', '/api/cars/models/2')
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.data).to.be.an('object');
                
                const expectedModel = {
                    id: 2,
                    carBrandId: 1,
                    title: "R8"
                };
                
                expect(response.body.data).to.deep.eq(expectedModel);
                expect(response.body.data).to.have.all.keys('id', 'carBrandId', 'title');
                expect(response.body.data.id).to.be.a('number');
                expect(response.body.data.carBrandId).to.be.a('number');
                expect(response.body.data.title).to.be.a('string');
            });
    });
    
});