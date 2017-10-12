import { ElementFinder, element, by } from 'protractor';

export class BasePage {

    readonly loginMenu: ElementFinder = element(by.css('nav.profile-menu'));
    readonly loginLink: ElementFinder = element(by.cssContainingText('a', 'Login'));
    readonly registerLink: ElementFinder = element(by.cssContainingText('a', 'Register'));
    readonly logoutLink: ElementFinder = element(by.cssContainingText('a', 'Logout'));
    readonly profileLink: ElementFinder = element(by.cssContainingText('a', 'Profile'));
    readonly changePasswordLink: ElementFinder = element(by.cssContainingText('a', 'Change Password'));

    readonly navigationMenu: ElementFinder = element(by.css('nav.navigation-menu'));
    readonly selectSiteLink: ElementFinder = element(by.cssContainingText('a', 'Select Site'));
    readonly newSiteLink: ElementFinder = element(by.cssContainingText('a', 'New Site'));
    readonly aboutLink: ElementFinder = element(by.cssContainingText('a', 'About'));

    readonly siteIdMenu: ElementFinder = element(by.css('nav.site-id-menu'));
    readonly saveSiteLink: ElementFinder = element(by.cssContainingText('a', 'Save'));
    readonly revertSiteLink: ElementFinder = element(by.cssContainingText('a', 'Revert'));
    readonly closeSiteLink: ElementFinder = element(by.cssContainingText('a', 'Close'));

    /**
     * Subclasses should return an element on the page that is always present regardless of state.  It is used to know if are on that page.
     */
    public identifyingElement(): ElementFinder {
        return null;
    }
}
