import HomePage from "../../page-objects/pages/HomePage";
import SignInForm from "../../page-objects/forms/SignInForm";
import GaragePage from "../../page-objects/pages/GaragePage";
import ExpensesPage from "../../page-objects/pages/ExpensesPage";

describe('Garage and Expenses Page Tests', () => {
    beforeEach(() => {
        HomePage.openPage();
        HomePage.openSignInFrom();
        SignInForm.loginWithCredentials();
    })
    
    describe('Garage Page Tests', () => {
        
        it('Add Audi TT car to the garage', () => {
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
    
    
    describe('Expenses Page Tests', () => {
        beforeEach(() => {
            HomePage.openExpensesButton();
        });

        it('Successfully add fuel expense to Ford Mondeo', () => {
            ExpensesPage.clickAddExpenseButton();
            ExpensesPage.selectVehicle('Ford Mondeo');
            ExpensesPage.enterMileage(2000);
            ExpensesPage.enterReportDate();
            ExpensesPage.enterNumberOfLiters(50);
            ExpensesPage.enterTotalCost(300);
            ExpensesPage.clickSubmitButton();

            ExpensesPage.verifyFuelExpensePopup('Fuel expense added');
            ExpensesPage.verifyExpenseInTable('2000');
        });

        it('Successfully add fuel expense to Audi TT', () => {
            ExpensesPage.addFuelExpense('Audi TT', 1800, 20, 150)

            ExpensesPage.verifyFuelExpensePopup('Fuel expense added');
            ExpensesPage.verifyExpenseInTable('1800');
        });

        it('Successfully add fuel expense to BMW X6', () => {
            ExpensesPage.addFuelExpense('BMW X6', 1100, 25, 250)

            ExpensesPage.verifyFuelExpensePopup('Fuel expense added');
            ExpensesPage.verifyExpenseInTable('1100');
        });

        it('Successfully add fuel expense to Porsche Cayenne', () => {
            ExpensesPage.addFuelExpense('Porsche Cayenne', 3000, 50, 500)

            ExpensesPage.verifyFuelExpensePopup('Fuel expense added');
            ExpensesPage.verifyExpenseInTable('3000');
        });

        it('Successfully add fuel expense to Fiat Panda', () => {
            ExpensesPage.addFuelExpense('Fiat Panda', 2200, 30, 350)

            ExpensesPage.verifyFuelExpensePopup('Fuel expense added');
            ExpensesPage.verifyExpenseInTable('2200');
        });

        it('Cancel add fuel expense form', () => {
            ExpensesPage.clickAddExpenseButton();
            ExpensesPage.selectVehicle('Ford Mondeo');
            ExpensesPage.enterMileage(1900);
            ExpensesPage.enterReportDate();
            ExpensesPage.enterNumberOfLiters(40);
            ExpensesPage.enterTotalCost(600);
            ExpensesPage.clickFormCancelButton();
            
            ExpensesPage.verifyFuelExpensePopupNotVisible('Fuel expense added');
        });

        it('Close add fuel expense form', () => {
            ExpensesPage.clickAddExpenseButton();
            ExpensesPage.сloseAddExpensesForm();
            
            ExpensesPage.vehicleDropdown.should('not.exist');
            ExpensesPage.verifyFuelExpensePopupNotVisible();
        });

        it('Add the same mileage to Porsche Cayenne', () => {
            ExpensesPage.addFuelExpense('Porsche Cayenne', 1000, 50, 500)

            ExpensesPage.verifyMileageAlertDanger('First expense mileage must not be less or equal to car initial mileage. Car initial mileage is 1000');
        });

        it('Add less mileage to Fiat Panda', () => {
            ExpensesPage.addFuelExpense('Fiat Panda', 800, 50, 500)

            ExpensesPage.verifyMileageAlertDanger('First expense mileage must not be less or equal to car initial mileage. Car initial mileage is 1000');
        });

        it('Empty Number of liters field', () => {
            ExpensesPage.clickAddExpenseButton();
            ExpensesPage.selectVehicle('Ford Mondeo');
            ExpensesPage.enterMileage(1900);
            ExpensesPage.enterReportDate;
            ExpensesPage.numberOfLitersField.focus();
            ExpensesPage.numberOfLitersField.blur();
            ExpensesPage.enterTotalCost(50);
           
            ExpensesPage.verifyErrorInput('Liters required');
            ExpensesPage.verifyAddButtonDisabled();            
        });

        it('Input 0 in Number of liters field', () => {
            ExpensesPage.clickAddExpenseButton();
            ExpensesPage.selectVehicle('Ford Mondeo');
            ExpensesPage.enterMileage(1900);
            ExpensesPage.enterReportDate;
            ExpensesPage.enterNumberOfLiters(0);
            ExpensesPage.enterTotalCost(50);
           
            ExpensesPage.verifyErrorInput('Liters has to be from 0.01 to 9999');
            ExpensesPage.verifyAddButtonDisabled();            
        });

        it('Input more than 9999 in Number of liters field', () => {
            ExpensesPage.clickAddExpenseButton();
            ExpensesPage.selectVehicle('Ford Mondeo');
            ExpensesPage.enterMileage(1900);
            ExpensesPage.enterReportDate;
            ExpensesPage.enterNumberOfLiters(10000);
            ExpensesPage.enterTotalCost(50);
            
            ExpensesPage.verifyErrorInput('Liters has to be from 0.01 to 9999');
            ExpensesPage.verifyAddButtonDisabled();            
        });

        it('Empty Total cost field', () => {
            ExpensesPage.clickAddExpenseButton();
            ExpensesPage.selectVehicle('Ford Mondeo');
            ExpensesPage.enterMileage(1900);
            ExpensesPage.enterReportDate;
            ExpensesPage.enterNumberOfLiters(50);
            ExpensesPage.totalCostField.focus();
            ExpensesPage.totalCostField.blur();
            
            ExpensesPage.verifyErrorInput('Total cost required');
            ExpensesPage.verifyAddButtonDisabled();            
        });

        it('Input negative number in Total cos field', () => {
            ExpensesPage.clickAddExpenseButton();
            ExpensesPage.selectVehicle('Ford Mondeo');
            ExpensesPage.enterMileage(1900);
            ExpensesPage.enterReportDate;
            ExpensesPage.enterNumberOfLiters(20);
            ExpensesPage.enterTotalCost(-200);
            
            ExpensesPage.verifyErrorInput('Total cost has to be from 0.01 to 1000000');
            ExpensesPage.verifyAddButtonDisabled();            
        });

        it('Input more 1000000 than in Total cos field', () => {
            ExpensesPage.clickAddExpenseButton();
            ExpensesPage.selectVehicle('Ford Mondeo');
            ExpensesPage.enterMileage(1900);
            ExpensesPage.enterReportDate;
            ExpensesPage.enterNumberOfLiters(20);
            ExpensesPage.enterTotalCost(1000001);
            
            ExpensesPage.verifyErrorInput('Total cost has to be from 0.01 to 1000000');
            ExpensesPage.verifyAddButtonDisabled();            
        });    
    });

    after(() => {
        cy.visit('panel/garage');
        GaragePage.removeAllCars();
    });

});