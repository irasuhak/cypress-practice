class GaragePage {

    get addNewCarButton() {
        return cy.get('.panel-page_heading button');
    }

    get addedCars() {
        return cy.get('.car-list li');
    }

    get carNamesSelector() {
        return '.car_name';
    }


    openPage() {
        cy.visit('/panel/garage');
    }

    openPageAsLoggedUser() {
        HomePage.openPage();
        HomePage.openSignInForm();
        SignInForm.loginWithCredentials('irynasuhak+1@gmail.com', 'Password1!@');
    }

    clickAddNewCar() {
        this.addNewCarButton.click();
    }

    countAddedCars() {
        return this.addedCars.its('length');
    }

    addNewCarByBrandAndModel(brand, model) {
        this.addNewCarButton.click();
        this.brandDropdown.select(brand);
        this.modelDropdown.select(model);
        this.mileageField.type(1000);
        this.submitAddingCarButton.click();
        this.submitAddingCarButton.should('not.be.visible');
    }

    verifyLastAddedCarByName(carName) {
        this.addedCars.eq(0).find(this.carNamesSelector).should('contain.text', carName);
    }

    removeAllCars() {
        if (this.addedCars) {
            this.addedCars.each((car) => {
                cy.wrap(car).find('.icon-edit').click();
                cy.contains('Remove car').click();
                cy.get('.btn-danger').click();
            })
        }
    }

}

export default new GaragePage();