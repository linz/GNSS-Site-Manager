import { browser } from 'protractor';
import { BasePage } from '../page-objects/base.pageobject';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { LoginActions } from '../utils/login.actions';

describe('Toolbar', () => {

    let basePage: BasePage = new BasePage();
    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);

    beforeEach(async () => {
        return await browser.get(selectSitePage.url);
    });

    it('should have the correct menus when logged in', () => {
        loginActions.login('user.a', 'gumby123A');
        expect(basePage.loginMenu.isPresent()).toEqual(true);
        expect(basePage.profileLink.isPresent()).toEqual(true);
        expect(basePage.changePasswordLink.isPresent()).toEqual(true);
        expect(basePage.logoutLink.isPresent()).toEqual(true);

        expect(basePage.navigationMenu.isPresent()).toEqual(true);
        expect(basePage.selectSiteLink.isPresent()).toEqual(true);
        expect(basePage.newSiteLink.isPresent()).toEqual(true);
        expect(basePage.newSiteLink.getAttribute('class')).not.toContain('disabled', 'New Site Link should not be disabled');
        expect(basePage.aboutLink.isPresent()).toEqual(true);
    });

    it('should have the correct menus when logged in and viewing a site', () => {
        loginActions.login('user.a', 'gumby123A');

        selectSitePage.openSite('ADE1');

        expect(basePage.siteIdMenu.isPresent()).toEqual(true);
        expect(basePage.saveSiteLink.isPresent()).toEqual(true);
        expect(basePage.revertSiteLink.isPresent()).toEqual(true);
        expect(basePage.closeSiteLink.isPresent()).toEqual(true);

        expect(basePage.loginMenu.isPresent()).toEqual(true);
        expect(basePage.profileLink.isPresent()).toEqual(true);
        expect(basePage.changePasswordLink.isPresent()).toEqual(true);
        expect(basePage.logoutLink.isPresent()).toEqual(true);

        expect(basePage.navigationMenu.isPresent()).toEqual(true);
        expect(basePage.selectSiteLink.isPresent()).toEqual(true);
        expect(basePage.newSiteLink.isPresent()).toEqual(true);
        expect(basePage.newSiteLink.getAttribute('class')).not.toContain('disabled', 'New Site Link should be enabled');
        expect(basePage.aboutLink.isPresent()).toEqual(true);
    });
});
