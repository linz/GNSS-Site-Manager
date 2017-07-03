import { browser, protractor } from 'protractor';
import { BasePage } from '../page-objects/base.pageobject';
import { OpenAmLoginPage } from '../page-objects/openam.pageobject';

/**
 * Login and Logout actions that tests can use.
 */
export class LoginActions {
    private openAmPage: OpenAmLoginPage = new OpenAmLoginPage();

    constructor(private caller: BasePage) {
    }

    /**
     * Log in if are not already
     */
    public login(username: string, password: string) {
        console.log('Is the login link present ...');

        this.caller.loginLink.isPresent().then((loginLinkIsPresent: boolean) => {
            if (loginLinkIsPresent) {

                this.caller.loginMenu.click();

                console.log('Login link is present');
                this.caller.loginLink.click().then(() => {
                    console.log('Login link clicked');
                });

                this.disableWaitingForAngular();
                let EC = protractor.ExpectedConditions;
                let loginButtonExpected = EC.presenceOf(this.openAmPage.loginButton);
                console.log('Wait for login button ...');
                browser.driver.wait(loginButtonExpected, 2000000).then(() => {
                    console.log('login button present');
                });
                this.openAmPage.userNameField.clear();
                this.openAmPage.userNameField.sendKeys(username);
                this.openAmPage.passwordField.clear();
                this.openAmPage.passwordField.sendKeys(password);
                this.openAmPage.loginButton.click().then(() => {
                    console.log('Login button clicked');
                    console.log('Wait for identifyingElement ...');
                });
                let identifyingElementExpected = EC.presenceOf(this.caller.identifyingElement());
                browser.driver.wait(identifyingElementExpected(), 20000).then(() => {
                    console.log('identifyingElement present');
                });
                this.enableWaitingForAngular();
            } else {
                console.log('LoginActions / login - already logged in');
            }
        });
    }

    /**
     * Log out if are not already
     */
    public logout() {
        console.log('Is the logout link present ...');
        this.caller.logoutLink.isPresent().then((logoutLinkIsPresent: boolean) => {
            if (logoutLinkIsPresent) {

                this.caller.loginMenu.click();

                console.log('Logout link is present');
                this.caller.logoutLink.click();
                this.disableWaitingForAngular();

                var EC = protractor.ExpectedConditions;
                let identifyingElementExpected = EC.presenceOf(this.caller.identifyingElement());
                browser.driver.wait(identifyingElementExpected(), 20000).then(() => {
                    console.log('identifyingElement present');
                });
                this.enableWaitingForAngular();
            } else {
                console.log('LoginActions / logout - already logged out');
            }
        });
    }

    /**
     * Call this function when going from an angular page to a non-angular page
     * to instruct protractor to stop waiting for angular zone tasks to complete.
     */
    private disableWaitingForAngular(): void {
        browser.ignoreSynchronization = true;
        browser.driver.manage().timeouts().implicitlyWait(12000);
    }

    /**
     * Call this function when re-entering an angular page to instruct protractor to
     * wait for angular zone tasks to complete, which is protractor's default behaviour.
     */
    private enableWaitingForAngular(): void {
        browser.ignoreSynchronization = false;
        browser.driver.manage().timeouts().implicitlyWait(0);
    }
}
