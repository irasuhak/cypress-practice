class GaragePage {
   
    get addNewCarButton() {
        return cy.get('.panel-page_heading button');
    }
    
    get addedCars() {
        return cy.get('.car-list li');
    }

    get carNameSelector() {
        return '.car_name';
    }

    openPage() {
        cy.visit('https://qauto.forstudy.space/panel/garage', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto',
            },
        });
    }

    clickAddNewCar() {
        this.addNewCarButton.click();
    }

    countAddedCars() {
        return this.addedCars.its('length');
    }

    verifyLastAddedCarName(carName) {
        this.addedCars.eq(0).find(this.carNameSelector).should('have.text', carName);
    }

    removeAllCars() {
        this.addedCars.each((car) => {
            cy.wrap(car).find('.icon-edit').click();
            cy.contains('Remove car').click();
            cy.get('.btn-danger').click();
        })
    }
    
}

export default new GaragePage();