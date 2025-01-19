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
    
}

export default new AddCarForm();