import { browser } from 'protractor';
import { UserRegistrationPage } from './user-registration.pageobject';

describe('User Registration', () => {

    let userRegistrationPage: UserRegistrationPage = new UserRegistrationPage();

    beforeEach(async () => {
        return await browser.get(userRegistrationPage.url);
    });

    it('should disable the save button until all fields have values', () => {

        expect(userRegistrationPage.okButton.isEnabled()).toBe(false);

        userRegistrationPage.firstName.sendKeys('Json');
        userRegistrationPage.lastName.sendKeys('Bourne');
        userRegistrationPage.organisation.sendKeys('Tha Real CIA');
        userRegistrationPage.position.sendKeys('Asset');
        userRegistrationPage.phone.sendKeys('12341234 5');
        userRegistrationPage.email.sendKeys('bourne@tharealcia.com');
        userRegistrationPage.remarks.sendKeys('Can haz register?');

        browser.waitForAngular();

        expect(userRegistrationPage.okButton.isEnabled()).toBe(true);
    });
});
