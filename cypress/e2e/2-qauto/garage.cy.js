import HomePage from "../../page-objects/pages/HomePage";
import SignInForm from "../../page-objects/forms/SignInForm";
import GaragePage from "../../page-objects/pages/GaragePage";
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
        

        it('Add Auti TT car to the garage', () => {
            GaragePage.clickAddNewCar();

            GaragePage.selectBrand('Audi');
            GaragePage.selectModel('TT');
            GaragePage.enterMileage(1500);
            GaragePage.submitForm();

            GaragePage.verifySuccessAlert('Car added');
            GaragePage.addedCars.should('have.length.greaterThan', 0);
            GaragePage.verifyLastAddedCarByName('Audi TT');
        })

        it('Add BMW X6 car to the garage', () => {
            GaragePage.addNewCarByBrandAndModel('BMW', 'X6');

            GaragePage.verifySuccessAlert('Car added');
            GaragePage.addedCars.should('have.length.greaterThan', 0);
            GaragePage.verifyLastAddedCarByName('BMW X6');
        })

        it('Add Ford Mondeo car to the garage', () => {
            GaragePage.addNewCarByBrandAndModel('Ford', 'Mondeo');

            GaragePage.verifySuccessAlert('Car added');
            GaragePage.addedCars.should('have.length.greaterThan', 0);
            GaragePage.verifyLastAddedCarByName('Ford Mondeo');
        })

        it('Add Porsche Cayenne car to the garage', () => {
            GaragePage.addNewCarByBrandAndModel('Porsche', 'Cayenne');

            GaragePage.verifySuccessAlert('Car added');
            GaragePage.addedCars.should('have.length.greaterThan', 0);
            GaragePage.verifyLastAddedCarByName('Porsche Cayenne');
        })

        it('Add Fiat Panda car to the garage', () => {
            GaragePage.addNewCarByBrandAndModel('Fiat', 'Panda');

            GaragePage.verifySuccessAlert('Car added');
            GaragePage.addedCars.should('have.length.greaterThan', 0);
            GaragePage.verifyLastAddedCarByName('Fiat Panda');
        })

        it('Empty mileage field', () => {
            GaragePage.clickAddNewCar();

            GaragePage.selectBrand('Fiat');
            GaragePage.selectModel('Scudo');
            GaragePage.mileageField.focus();
            GaragePage.mileageField.blur();
            GaragePage.verifyError('Mileage cost required')
            GaragePage.verifySubmitButtonDisabled();            
        });

         it('Input negative number in mileage field', () => {
            GaragePage.clickAddNewCar();

            GaragePage.selectBrand('Ford');
            GaragePage.selectModel('Fusion');
            GaragePage.enterMileage(-20);
            GaragePage.mileageField.blur();
            GaragePage.verifyError('Mileage has to be from 0 to 999999')
            GaragePage.verifySubmitButtonDisabled();            
        });
        
        it('Input number more 999999 in mileage field', () => {
            GaragePage.clickAddNewCar();

            GaragePage.selectBrand('Audi');
            GaragePage.selectModel('A8');
            GaragePage.enterMileage(1000000);
            GaragePage.mileageField.blur();
            GaragePage.verifyError('Mileage has to be from 0 to 999999')
            GaragePage.verifySubmitButtonDisabled();            
        });
        
        it('Cancel adding a car', () => {
            GaragePage.clickAddNewCar();
        
            GaragePage.selectBrand('BMW');
            GaragePage.selectModel('5');
            GaragePage.enterMileage(2000);
            GaragePage.cancelForm();
        
            GaragePage.verifyCarNotAdded('BMW 5');
        })

        it('Close Add car form', () => {
            GaragePage.clickAddNewCar();

            GaragePage.closeForm();
            GaragePage.brandDropdown.should('not.exist');
        });
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
            ExpensesPage.selectVehicle('Ford Mondeo');
            ExpensesPage.enterMileage(4000);
            ExpensesPage.enterReportDate();
           
            ExpensesPage.enterNumberOfLiters(50);
            ExpensesPage.enterTotalCost(200);
            ExpensesPage.clickSubmitButton();
        });

    
    });

    // after(() => {
    //     GaragePage.removeAllCars();
    //  })

    // it.only('remove', () => {

    //     GaragePage.removeAllCars()

    // });

});