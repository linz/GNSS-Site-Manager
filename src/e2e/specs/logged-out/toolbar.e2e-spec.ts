import { browser } from 'protractor';
import { LoginActions } from '../utils/login.actions';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { SiteLogPage } from '../page-objects/site-log.pageobject';

describe('Toolbar', () => {

    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);

    beforeEach(async () => {
        return await browser.get(selectSitePage.url);
    });

    it('should have the correct menus when logged out', () => {
        loginActions.logout();
        expect(selectSitePage.loginMenu.isPresent()).toEqual(true);
        expect(selectSitePage.loginLink.isPresent()).toEqual(true);
        expect(selectSitePage.registerLink.isPresent()).toEqual(true);

        expect(selectSitePage.navigationMenu.isPresent()).toEqual(true);
        expect(selectSitePage.selectSiteLink.isPresent()).toEqual(true);
        expect(selectSitePage.newSiteLink.isPresent()).toEqual(true);
        expect(selectSitePage.newSiteLink.getAttribute('class')).toContain('disabled', 'New Site Link should be disabled');
        expect(selectSitePage.aboutLink.isPresent()).toEqual(true);
    });

    it('should have the correct menus when logged out and viewing a site', () => {
        loginActions.logout();

        let siteLogPage: SiteLogPage = selectSitePage.openSite('ADE1');

        expect(siteLogPage.siteIdMenu.isPresent()).toEqual(true);
        expect(siteLogPage.saveSiteLink.isPresent()).toEqual(true);
        expect(siteLogPage.saveSiteLink.getAttribute('class')).toContain('disabled', 'Save link should be disabled');
        expect(siteLogPage.revertSiteLink.isPresent()).toEqual(true);
        expect(siteLogPage.closeSiteLink.isPresent()).toEqual(true);

        expect(siteLogPage.loginMenu.isPresent()).toEqual(true);
        expect(siteLogPage.loginLink.isPresent()).toEqual(true);
        expect(siteLogPage.registerLink.isPresent()).toEqual(true);

        expect(siteLogPage.navigationMenu.isPresent()).toEqual(true);
        expect(siteLogPage.selectSiteLink.isPresent()).toEqual(true);
        expect(siteLogPage.newSiteLink.isPresent()).toEqual(true);
        expect(siteLogPage.newSiteLink.getAttribute('class')).toContain('disabled', 'New Site Link should be disabled');
        expect(siteLogPage.aboutLink.isPresent()).toEqual(true);
    });
});
