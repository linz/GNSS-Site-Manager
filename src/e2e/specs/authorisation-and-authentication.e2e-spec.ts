import { browser } from 'protractor';
import { SelectSitePage } from './select-site.pageobject';
import { SiteLogPage } from './site-log.pageobject';
import { LoginActions } from './login.actions';

describe('Authorization/Authentication', () => {
    let selectSitePage: SelectSitePage = new SelectSitePage();
    let siteLogPage: SiteLogPage = new SiteLogPage();
    let loginActions: LoginActions  = new LoginActions(selectSitePage);

    let loadRoot = () => {
        browser.get('/');
    };

    beforeEach(loadRoot);

    it('login menu and link should exist', () => {
        expect(siteLogPage.loginMenu.isPresent()).toBe(true);
        expect(siteLogPage.loginLink.isPresent()).toBe(true);
    });

    it('should not allow edits when a user is not logged in', () => {
        loginActions.logOut();
        selectSitePage.searchForClickOnSiteName('ADE1');

        siteLogPage.siteInformationHeader.click();
        siteLogPage.siteIdentificationHeader.click();

        expect(siteLogPage.siteNameInput.isEnabled()).toBe(false, 'siteNameInput should not be enabled');
    });

    it('should allow edits when a user is logged in', () => {
        loginActions.logIn('user.a', 'gumby123A');

        selectSitePage.searchForClickOnSiteName('ADE1');

        siteLogPage.siteInformationHeader.click();
        siteLogPage.siteIdentificationHeader.click();

        expect(siteLogPage.siteNameInput.isEnabled()).toBe(true, 'siteNameInput should be enabled');
    });
});
