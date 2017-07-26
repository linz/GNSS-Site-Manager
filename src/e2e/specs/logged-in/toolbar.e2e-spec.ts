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

    it('should have the correct menus when logged in', () => {
        loginActions.login('user.a', 'gumby123A');
        expect(selectSitePage.loginMenu.isPresent()).toEqual(true);
        expect(selectSitePage.profileLink.isPresent()).toEqual(true);
        expect(selectSitePage.changePasswordLink.isPresent()).toEqual(true);
        expect(selectSitePage.logoutLink.isPresent()).toEqual(true);

        expect(selectSitePage.navigationMenu.isPresent()).toEqual(true);
        expect(selectSitePage.selectSiteLink.isPresent()).toEqual(true);
        expect(selectSitePage.newSiteLink.isPresent()).toEqual(true);
        expect(selectSitePage.newSiteLink.getAttribute('class')).not.toContain('disabled', 'New Site Link should not be disabled');
        expect(selectSitePage.aboutLink.isPresent()).toEqual(true);
    });

    it('should have the correct menus when logged in and viewing a site', () => {
        loginActions.login('user.a', 'gumby123A');

        let siteLogPage: SiteLogPage = selectSitePage.openSite('ADE1');

        expect(siteLogPage.siteIdMenu.isPresent()).toEqual(true);
        expect(siteLogPage.saveSiteLink.isPresent()).toEqual(true);
        expect(siteLogPage.revertSiteLink.isPresent()).toEqual(true);
        expect(siteLogPage.closeSiteLink.isPresent()).toEqual(true);

        expect(siteLogPage.loginMenu.isPresent()).toEqual(true);
        expect(siteLogPage.profileLink.isPresent()).toEqual(true);
        expect(siteLogPage.changePasswordLink.isPresent()).toEqual(true);
        expect(siteLogPage.logoutLink.isPresent()).toEqual(true);

        expect(siteLogPage.navigationMenu.isPresent()).toEqual(true);
        expect(siteLogPage.selectSiteLink.isPresent()).toEqual(true);
        expect(siteLogPage.newSiteLink.isPresent()).toEqual(true);
        expect(siteLogPage.newSiteLink.getAttribute('class')).not.toContain('disabled', 'New Site Link should be enabled');
        expect(siteLogPage.aboutLink.isPresent()).toEqual(true);
    });
});
