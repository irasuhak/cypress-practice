class ExpensesPage {
   
    get addExpenseButton() {
        return cy.get('.panel-page_heading .btn-primary');
    }
    
    get vehicleDropdown() {
        return cy.get('#addExpenseCar');
    }

    get reportDataField() {
        return cy.get('#addExpenseDate');
    }

    get calendarButton() {
        return cy.get('.date-picker-toggle');
    }

    get mileageField() {
        return cy.get('#addExpenseMileage');
    }

    get numberOfLitersField() {
        return cy.get('#addExpenseLiters');
    }

    get totalCostField() {
        return cy.get('#addExpenseTotalCost');
    }

    get submitButton() {
        return cy.get('.modal-footer .btn.btn-primary');
    }

    get formCancelButton() {
        return cy.get('.btn-secondary');
    }

    get formCloseButton() {
        return cy.get('.close');
    }

    openPage() {
        cy.visit('/panel/expenses');
    }

    clickAddExpenseButton() {
        this.addExpenseButton.click();
    }

    selectVehicle(vehicleName) { 
        this.vehicleDropdown
        .find('option')
        .contains(vehicleName)  
        .then(option => {
            this.vehicleDropdown.select(option.val());  
        });
    }

    enterReportDate(date) {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const year = today.getFullYear();
        const formattedDate = `${day}.${month}.${year}`; 
        this.reportDataField.clear().type(formattedDate, { force: true });
        }

    openCalendar() {
        this.calendarButton.click();
    }
    enterMileage(mileage) {
        this.mileageField.click().clear().type(mileage);
    }

    enterNumberOfLiters(liters) {
        this.numberOfLitersField.type(liters);
    }

    enterTotalCost(cost) {
        this.totalCostField.type(cost).blur();
    }

    clickSubmitButton() {
        this.submitButton.click();
    }

    clickFormCancelButton() {
        this.formCancelButton.click();
    }

    сloseForm() {
        this.formCancelButton.click();
    }


}

export default new ExpensesPage();