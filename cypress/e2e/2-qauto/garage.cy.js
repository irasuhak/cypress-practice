import HomePage from "../../page-objects/pages/HomePage";
import SignInForm from "../../page-objects/forms/SignInForm";
import GaragePage from "../../page-objects/pages/GaragePage";
import AddCarForm from "../../page-objects/forms/AddCarForm";
import ExpensesPage from "../../page-objects/pages/ExpensesPage";

describe('Garage and Expenses Page Tests', () => {
    before(() => {
        // HomePage.openPage();
        // HomePage.openSignInFrom();
        // SignInForm.loginWithCredentials('irynasuhak+1@gmail.com', 'Password1!@');
        //GaragePage.removeAllCars();
    })

    describe('Garage Page Tests', () => {
        beforeEach(() => {
            HomePage.openPage();
            HomePage.openSignInFrom();
            SignInForm.loginWithCredentials('irynasuhak+1@gmail.com', 'Password1!@');
        })

        it('Cancel adding a car', () => {
            GaragePage.clickAddNewCar();

            AddCarForm.selectBrand('BMW');
            AddCarForm.selectModel('5');
            AddCarForm.enterMileage(2000);
            AddCarForm.cancelForm();

            //GaragePage.addedCars.should('not.exist', 'BMW 5');
        });

        it('Add a new car to the garage', () => {
            GaragePage.clickAddNewCar();

            AddCarForm.selectBrand('Audi');
            AddCarForm.selectModel('TT');
            AddCarForm.enterMileage(1500);
            AddCarForm.submitForm();

            GaragePage.addedCars.should('have.length.greaterThan', 0);
            GaragePage.verifyLastAddedCarByName('Audi TT');
        });

        it('Close Add car form', () => {
            GaragePage.clickAddNewCar();

            AddCarForm.closeForm();
            AddCarForm.brandDropdown.should('not.exist');
        });

        // it('remove', () => {

        //     GaragePage.removeAllCars()
    
        // });

    });

    describe.only('Expenses Page Tests', () => {
        before(() => {
            HomePage.openPage();
            HomePage.openSignInFrom();
            SignInForm.loginWithCredentials('irynasuhak+1@gmail.com', 'Password1!@');
            HomePage.openExpensesButton();
        });

        it('Add fuel expense successfully', () => {
            ExpensesPage.clickAddExpenseButton()
            ExpensesPage.selectVehicle('Audi TT');
            ExpensesPage.enterMileage(4000);
            ExpensesPage.enterReportDate('23.01.2025');
           
            ExpensesPage.enterNumberOfLiters(50);
            ExpensesPage.enterTotalCost(200);
            ExpensesPage.clickSubmitButton();

        });

        // it('Cancel adding expense', () => {

        //     // ExpensesPage.clickAddExpenseButton();

        //     // ExpensesPage.selectVehicle('Audi TT');
        //     // ExpensesPage.enterReportDate('2025-01-21');
        //     // ExpensesPage.enterMileage(1600);
        //     // ExpensesPage.enterNumberOfLiters(50);
        //     // ExpensesPage.enterTotalCost(120);
        //     // ExpensesPage.clickFormCancelButton();


        // });
    });

    // after(() => {
    //     GaragePage.removeAllCars();
    //  })

    // it('remove', () => {

    //     GaragePage.removeAllCars()

    // });

});