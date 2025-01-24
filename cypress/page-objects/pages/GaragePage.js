class GaragePage {

    get addNewCarButton() {
        return cy.get('.panel-page_heading button');
    }

    get brandDropdown() {
        return cy.get('#addCarBrand');
    }

    get modelDropdown() {
        return cy.get('#addCarModel');
    }

    get mileageField() {
        return cy.get('#addCarMileage');
    }

    get submitAddingCarButton() {
        return cy.get('app-add-car-modal .btn-primary');
    }

    get successAlert() {
        return cy.get('.alert.alert-success');
    }

    get cancelAddingCarButton() {
        return cy.get('app-add-car-modal .btn-secondary');
    }

    get errorMessage() {
        return cy.get('.invalid-feedback p');
    }

    get closeButton() {
        return cy.get('.close')
    }

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

    selectBrand(brand) {
        this.brandDropdown.select(brand);
    }
   
    selectModel(model) {
        this.modelDropdown.select(model);
    }

    enterMileage(mileage) {
        this.mileageField.type(mileage);
    }

    verifyError(message) {
        this.errorMessage.should('be.visible').and('contain.text', message);
        this.mileageField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
    }

    submitForm() {
        this.submitAddingCarButton.click();
    }

    verifySubmitButtonDisabled() {
        this.submitAddingCarButton.should('be.disabled'); 
    }

    verifySuccessAlert(message) {
        this.successAlert.should('be.visible').and('contain.text', message);
    }

    cancelForm() {
        this.cancelAddingCarButton.click();
    }

    closeForm() {
        this.closeButton.click();
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

    verifyCarNotAdded(carName) {
        this.addedCars.each((car) => {
            cy.wrap(car).should('not.contain.text', carName);
        });
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