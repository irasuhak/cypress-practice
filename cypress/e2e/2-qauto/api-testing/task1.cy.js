/// <reference types="cypress"/>
import HomePage from "../../../page-objects/pages/HomePage";
import SignInForm from "../../../page-objects/forms/SignInForm";

describe('Public requests', () => {        

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
    });

    it('Get car model by id [/api/cars/models/{id}]', () => {
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


describe('Private requests', () => {  
    let globalSid;

    before(() => {
        cy.request('POST', '/api/auth/signin', {
            email: 'irynasuhak+1@gmail.com',
            password: 'Password1!@',
        }).then((response) => {
            const cookie = response.headers['set-cookie'][0];
            const sid = cookie.split(';')[0].split('=')[1];
            globalSid = sid; 
        })
    })

    it('Add a new car [/api/cars]', () => {
        const carBrandId = 1;
        const carModelId = 3;
        const mileage = 122;
    
        cy.request({
            method: 'POST',
            url: '/api/cars',
            headers: {
                Cookie: `sid=${globalSid}`,
            },
            body: { carBrandId, carModelId, mileage }
        }).then((response) => {
            cy.log(JSON.stringify(response.body.data));
    
            expect(response.status).to.eq(201);
            expect(response.body.data.carBrandId).to.eq(carBrandId);
            expect(response.body.data.carModelId).to.eq(carModelId);
            expect(response.body.data.mileage).to.eq(mileage);
        });
    });

    it('Update car mileage', () => {
        const newCar = {
            carBrandId: 1,
            carModelId: 1,
            mileage: 150
        };
    
        cy.request({
            method: 'POST',
            url: '/api/cars',
            headers: {
                Cookie: `sid=${globalSid}`,
            },
            body: newCar
        }).then((postResponse) => {
            expect(postResponse.status).to.eq(201);
    
            const carId = postResponse.body.data.id; 
            const updatedMileage = newCar.mileage + 50; 
    
            cy.request({
                method: 'PUT',
                url: `/api/cars/${carId}`,
                headers: {
                    Cookie: `sid=${globalSid}`,
                },
                body: {
                    mileage: updatedMileage
                }
            }).then((putResponse) => {
                cy.log(JSON.stringify(putResponse.body.data));
    
                expect(putResponse.status).to.eq(200);
                expect(putResponse.body.status).to.eq('ok');
                expect(putResponse.body.data.id).to.eq(carId);
                expect(putResponse.body.data.mileage).to.eq(updatedMileage);
            });
        });
    });

        it('Get current user cars [/api/cars]', () => {
        cy.request({
            method: 'GET',
            url: '/api/cars',
            headers: {
              Cookie: `sid=${globalSid}`,
            },
        }).then((response) => {
            cy.log(JSON.stringify(response.body.data))

            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.an('array').that.is.not.empty;
        });
    });

    after(() => {
        cy.request({
            method: 'GET',
            url: '/api/cars',
            headers: {
                Cookie: `sid=${globalSid}`,
            },
        }).then((response) => {
            const allCars = response.body.data;
            allCars.forEach((car) => {
                cy.request({
                    method: 'DELETE',
                    url: `/api/cars/${car.id}`,
                    headers: {
                        Cookie: `sid=${globalSid}`,
                    },
                }).then((response) => {
                    expect(response.status).eq(200);
                });
            });
        });
    });
});
