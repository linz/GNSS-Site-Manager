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
        this.caller.loginLink.isPresent().then((loginLinkIsPresent: boolean) => {
            if (loginLinkIsPresent) {
                this.caller.loginMenu.click();
                this.caller.loginLink.click().then(() => {
                    console.log('Login link clicked');
                });

                this.disableWaitingForAngular();
                let EC = protractor.ExpectedConditions;
                let loginButtonExpected = EC.presenceOf(this.openAmPage.loginButton);
                browser.driver.wait(loginButtonExpected, 2000000).then(() => {
                    console.log('Switched to OpenAM login interface ...');
                });
                this.openAmPage.userNameField.clear();
                this.openAmPage.userNameField.sendKeys(username);
                this.openAmPage.passwordField.clear();
                this.openAmPage.passwordField.sendKeys(password);
                this.openAmPage.loginButton.click().then(() => {
                    console.log('Login button clicked');
                    console.log('Wait for switching back to GNSS site manager ...');
                });
                let identifyingElementExpected = EC.presenceOf(this.caller.identifyingElement());
                browser.driver.wait(identifyingElementExpected(), 20000).then(() => {
                    console.log('Logged in as "' + username + '" successfully');
                });
                this.enableWaitingForAngular();
            } else {
                console.log('Skip login - already logged in');
            }
        });
    }

    /**
     * Log out if are not already
     */
    public logout() {
        this.caller.logoutLink.isPresent().then((logoutLinkIsPresent: boolean) => {
            if (logoutLinkIsPresent) {
                this.caller.loginMenu.click();
                this.caller.logoutLink.click();
                this.disableWaitingForAngular();
                var EC = protractor.ExpectedConditions;
                let identifyingElementExpected = EC.presenceOf(this.caller.identifyingElement());
                browser.driver.wait(identifyingElementExpected(), 20000).then(() => {
                    console.log('Logged out successfully');
                });
                this.enableWaitingForAngular();
            } else {
                console.log('Skip logout - already logged out');
            }
        });
    }

    /**
     * Login with given user name and password. Skip login if already signed in with the same credential, otherwise,
     * log out first if already signed in as a different user.
     *
     */
    public loginAs(username: string, password: string): void {
        this.caller.profileLink.isPresent().then((isLoggedIn: boolean) => {
            if (isLoggedIn) {
                this.caller.loginMenu.click();
                this.caller.profileLink.getText().then((value: string) => {
                    let oldUsername: string = value.replace(' Profile', '');
                    if (oldUsername !== username) {
                        this.caller.logoutLink.click().then(() => {
                            console.log('Logged out - previously signed in as a different user "' + oldUsername + '"');
                        });
                    } else {
                        this.caller.loginMenu.click();
                    }
                });
            }

            browser.waitForAngular();
            this.caller.loginLink.isPresent().then((loginLinkIsPresent: boolean) => {
                if (loginLinkIsPresent) {
                    this.caller.loginMenu.click();
                    this.caller.loginLink.click();

                    this.disableWaitingForAngular();
                    let EC = protractor.ExpectedConditions;
                    let loginButtonExpected = EC.presenceOf(this.openAmPage.loginButton);
                    browser.driver.wait(loginButtonExpected(), 2000000).then(() => { // It differs from login() function
                        console.log('Switched to OpenAM login interface ...');
                    });
                    this.openAmPage.userNameField.clear();
                    this.openAmPage.userNameField.sendKeys(username);
                    this.openAmPage.passwordField.clear();
                    this.openAmPage.passwordField.sendKeys(password);
                    this.openAmPage.loginButton.click().then(() => {
                        console.log('Wait for switching back to GNSS site manager ...');
                    });
                    let identifyingElementExpected = EC.presenceOf(this.caller.identifyingElement());
                    browser.driver.wait(identifyingElementExpected(), 20000).then(() => {
                        console.log('Logged in as "' + username + '" successfully');
                    });
                    this.enableWaitingForAngular();
                } else {
                    console.log('Skip login - already logged in as "' + username + '"');
                }
            });
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
