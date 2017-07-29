import { browser } from 'protractor';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { LoginActions } from '../utils/login.actions';

describe('Authorization/Authentication', () => {
    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions  = new LoginActions(selectSitePage);

    beforeEach(async () => {
        return await browser.get(selectSitePage.url);
    });

    it('should allow edits when a user is logged in', () => {
        loginActions.login('user.a', 'gumby123A');
        let siteLogPage: SiteLogPage = selectSitePage.openSite('ADE1');
        siteLogPage.siteInformationHeader.click();
        siteLogPage.siteIdentificationHeader.click();
        expect(siteLogPage.siteNameInput.isEnabled()).toBe(true, 'siteNameInput should be enabled');
    });
});
