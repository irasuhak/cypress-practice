class ExpensesPage {
   
    get addExpenseButton() {
        return cy.get('.panel-page_heading .btn-primary');
        //return cy.get('body > app-root > app-global-layout > div > div > div > app-panel-layout > div > div > div > div.col-lg-9.main-wrapper > div > app-fuel-expenses > div > div.panel-page_heading.d-flex.flex-column.flex-lg-row > div > button');
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
        this.vehicleDropdown.select(vehicleName);
    }

    enterReportDate(date) {
        this.reportDataField.clear().type(date, { force: true });
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