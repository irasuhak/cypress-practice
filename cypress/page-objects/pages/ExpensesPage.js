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

    get mileageAlertDanger() {
        return cy.get('.alert.alert-danger');
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

    get fuelExpensePopup() {
        return cy.get('app-alert p');
    }

    get formCancelButton() {
        return cy.get('.modal-footer .btn-secondary');
    }

    get formCloseButton() {
        return cy.get('.close');
    }

    
    get addedFuelExpenses() {
        return cy.get('.expenses_table tbody tr');
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

    сloseAddExpensesForm() {
        this.formCancelButton.click();
    }

    verifyFuelExpensePopup(message) {
        this.fuelExpensePopup.should('be.visible').and('contain.text', message);
    }

    verifyFuelExpensePopupNotVisible(message) {
        this.fuelExpensePopup.should('not.exist');
    }

    verifyMileageAlertDanger(expectedMessage) {
        this.mileageAlertDanger.should('be.visible').and('contain.text', expectedMessage)
        .and('have.css', 'border-color', 'rgb(245, 198, 203)');
    }

    verifyExpenseInTable(parameter) {
        this.addedFuelExpenses.should('contain.text', parameter);
    }

    addFuelExpense(vehicle, mileage, liters, cost) {
        this.clickAddExpenseButton();
        this.selectVehicle(vehicle);
        this.enterMileage(mileage);
        this.enterReportDate();
        this.enterNumberOfLiters(liters);
        this.enterTotalCost(cost);
        this.clickSubmitButton();
    }
}

export default new ExpensesPage();