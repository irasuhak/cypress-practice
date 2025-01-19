import HomePage from "../../page-objects/pages/HomePage";
import SignInForm from "../../page-objects/forms/SignInForm";
import GaragePage from "../../page-objects/pages/GaragePage";
import AddCarForm from "../../page-objects/forms/AddCarForm";

describe('Garage Page Tests', () => {
    beforeEach(() => {
        HomePage.openPage();
        HomePage.openSignInFrom();
        SignInForm.loginWithCredentials('irynasuhak+1@gmail.com', 'Password1!@');
    })

    it('Cancel adding a car', ()=> {
        GaragePage.clickAddNewCar();

        AddCarForm.selectBrand('BMW');
        AddCarForm.selectModel('5');
        AddCarForm.enterMileage(2000);
        AddCarForm.cancelForm();
        
        GaragePage.addedCars.should('have.length', 0);
        GaragePage.addedCars.should('not.exist', 'BMW 5');
    })

    it('Add a new car to the garage', ()=> {
        GaragePage.clickAddNewCar();

        AddCarForm.selectBrand('Audi');
        AddCarForm.selectModel('TT');
        AddCarForm.enterMileage(1500);
        AddCarForm.submitForm();
        
        GaragePage.addedCars.should('have.length.greaterThan', 0);
        GaragePage.verifyLastAddedCarName('Audi TT');
    })

    it('Close Add car form', ()=> {
        GaragePage.clickAddNewCar();

        AddCarForm.closeForm();
        AddCarForm.brandDropdown.should('not.exist');        
    })

    after(() => {
        GaragePage.removeAllCars();
    })
})