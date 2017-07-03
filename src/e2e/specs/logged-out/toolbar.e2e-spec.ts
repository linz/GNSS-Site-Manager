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

    it('should have the correct menus when logged out', () => {
        loginActions.logout();
        expect(basePage.loginMenu.isPresent()).toEqual(true);
        expect(basePage.loginLink.isPresent()).toEqual(true);
        expect(basePage.registerLink.isPresent()).toEqual(true);

        expect(basePage.navigationMenu.isPresent()).toEqual(true);
        expect(basePage.selectSiteLink.isPresent()).toEqual(true);
        expect(basePage.newSiteLink.isPresent()).toEqual(true);
        expect(basePage.newSiteLink.getAttribute('class')).toContain('disabled', 'New Site Link should be disabled');
        expect(basePage.aboutLink.isPresent()).toEqual(true);
    });

    it('should have the correct menus when logged out and viewing a site', () => {
        loginActions.logout();

        selectSitePage.openSite('ADE1');

        expect(basePage.siteIdMenu.isPresent()).toEqual(true);
        expect(basePage.saveSiteLink.isPresent()).toEqual(true);
        expect(basePage.saveSiteLink.getAttribute('class')).toContain('disabled', 'Save link should be disabled');
        expect(basePage.revertSiteLink.isPresent()).toEqual(true);
        expect(basePage.closeSiteLink.isPresent()).toEqual(true);

        expect(basePage.loginMenu.isPresent()).toEqual(true);
        expect(basePage.loginLink.isPresent()).toEqual(true);
        expect(basePage.registerLink.isPresent()).toEqual(true);

        expect(basePage.navigationMenu.isPresent()).toEqual(true);
        expect(basePage.selectSiteLink.isPresent()).toEqual(true);
        expect(basePage.newSiteLink.isPresent()).toEqual(true);
        expect(basePage.newSiteLink.getAttribute('class')).toContain('disabled', 'New Site Link should be disabled');
        expect(basePage.aboutLink.isPresent()).toEqual(true);
    });
});
