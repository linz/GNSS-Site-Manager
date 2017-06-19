import { browser, element, by } from 'protractor';

describe('User Registration', () => {

    let loadRoot = () => {
        browser.get('/');
    };

    beforeEach(loadRoot);

    it('should disable the save button until all fields have values', () => {

        element(by.id('profile-dropdown-menu')).click();
        element(by.cssContainingText('a', 'Register')).click();

        let okButton = element(by.cssContainingText('button', 'OK'));
        expect(okButton.isEnabled()).toBe(false);

        let firstName = element(by.xpath('//text-input[@controlname="firstName"]//input'));
        firstName.sendKeys('Json');

        let lastName = element(by.xpath('//text-input[@controlname="lastName"]//input'));
        lastName.sendKeys('Bourne');

        let organisation = element(by.xpath('//text-input[@controlname="organisation"]//input'));
        organisation.sendKeys('Tha Real CIA');

        let position = element(by.xpath('//text-input[@controlname="position"]//input'));
        position.sendKeys('Asset');

        let phone = element(by.xpath('//text-input[@controlname="phone"]//input'));
        phone.sendKeys('12341234 5');

        let email = element(by.xpath('//text-input[@controlname="email"]//input'));
        email.sendKeys('bourne@tharealcia.com');

        let remarks = element(by.xpath('//textarea-input[@controlname="remarks"]//textarea'));
        remarks.sendKeys('Can haz register?');

        browser.waitForAngular();

        expect(okButton.isEnabled()).toBe(true);
    });
});
