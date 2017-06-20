import { browser, element, by } from 'protractor';

/**
 * Call this function when going from an angular page to a non-angular page
 * to instruct protractor to stop waiting for anuglar zone tasks to complete.
 */
function disableWaitingForAngular(): void {
    browser.ignoreSynchronization = true;
    browser.driver.manage().timeouts().implicitlyWait(12000);
}

/**
 * Call this function when re-entering an angular page to instruct protractor to
 * wait for angular zone tasks to complete, which is protractor's default behaviour.
 */
function enableWaitingForAngular(): void {
    browser.ignoreSynchronization = false;
    browser.driver.manage().timeouts().implicitlyWait(0);
}

describe('Authorization/Authentication', () => {

    let loadRoot = () => {
        browser.get('/');
    };

    beforeEach(loadRoot);

    it('should not allow edits when a user is not logged in', () => {
        let searchText = element(by.name('searchText'));
        searchText.sendKeys('ADE1');

        browser.waitForAngular();

        element(by.cssContainingText('table tr td', 'ADE1')).click();
        element(by.cssContainingText('span', 'Site Information')).click();
        element(by.cssContainingText('span', 'Site Identification')).click();

        let siteNameElement = element(by.xpath('//text-input[@controlname="siteName"]//input'));
        expect(siteNameElement.isEnabled()).toBe(false);
    });

    it('should allow edits when a user is logged in', () => {

        // click the login button
        element(by.xpath('//nav[contains(@class, "profile-menu")]')).click();
        element(by.xpath('//a[text() = "Login"]')).click();

        disableWaitingForAngular();

        browser.driver.wait(() => {
            return browser.driver.findElement(by.id('loginButton_0'))
                .then((loginButton) => {
                    let userNameField = browser.driver.findElement(by.id('idToken1'));
                    userNameField.clear();
                    userNameField.sendKeys('user.a');
                    let passwordField = browser.driver.findElement(by.id('idToken2'));
                    passwordField.clear();
                    passwordField.sendKeys('gumby123A');
                    loginButton.click();
                    return true;
                });
        }, 20000);

        browser.driver.wait(() => {
            return browser.driver.findElement(by.name('searchText'))
                .then(function(element) {
                    return true;
                });

        });
        enableWaitingForAngular();

        let searchText = element(by.name('searchText'));
        searchText.sendKeys('ADE1');

        browser.waitForAngular();

        element(by.cssContainingText('table tr td', 'ADE1')).click();
        element(by.cssContainingText('span', 'Site Information')).click();
        element(by.cssContainingText('span', 'Site Identification')).click();

        let siteNameElement = element(by.xpath('//text-input[@controlname="siteName"]//input'));
        expect(siteNameElement.isEnabled()).toBe(true);
    });
});
