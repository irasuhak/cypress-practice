class AddCarForm {
   
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

    get cancelAddingCarButton() {
        return cy.get('app-add-car-modal .btn-secondary');
    }
    
    get closeButton() {
        return cy.get('.close')
    }

    get addNewCarButton() {
        return cy.get('.panel-page_heading button');
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

    submitForm() {
        this.submitAddingCarButton.click();
    }

    cancelForm() {
        this.cancelAddingCarButton.click();
    }

    closeForm() {
        this.closeButton.click();
    }

    addNewCarByBrandAndModel(brand, model) {
        this.addNewCarButton.click();
        this.brandDropdown.select(brand);
        this.modelDropdown.select(model);
        this.mileageField.type(1000);
        this.submitAddingCarButton.click();
        this.submitAddingCarButton.should('not.be.visible');
    }
    
}

export default new AddCarForm();