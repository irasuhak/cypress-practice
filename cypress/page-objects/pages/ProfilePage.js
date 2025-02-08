class ProfilePage {

    get profileSection() {
        return cy.get('a.sidebar_btn.-profile');
    }

    get editProfileButton() {
        return cy.contains('.btn-primary', 'Edit profile');
    }
    
    get saveButton() {
        return cy.contains('button', 'Save');
    }
    
    get profileName() {
        return cy.get('.profile_name');
    }
    

    openProfile() {
        this.profileSection.click();
    }

    clickEditProfile() {
        this.editProfileButton.click();
    }

    saveProfileChanges() {
        this.saveButton.click();
    }
}

export default new ProfilePage();