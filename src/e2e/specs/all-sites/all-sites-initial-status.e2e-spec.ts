import { browser, ElementFinder } from 'protractor';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { LoginActions } from '../utils/login.actions';
import { SiteLogPage } from '../page-objects/site-log.pageobject';

describe('All GNSS sites', () => {

    let adminUser: string = 'user.x';
    let adminPassword: string = 'gumby123X';
    let allSiteIds: string[] = [];

    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);
    let originalTimeout: number;

    beforeAll(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        loginActions.logout();
    });

    beforeEach(async () => {
        return await browser.get(selectSitePage.url);
    });

    it('expect should have a list of sites available', () => {
        loginActions.loginAs(adminUser, adminPassword);
        browser.waitForAngular();

        selectSitePage.searchAll();
        expect(selectSitePage.selectSiteList.isPresent()).toEqual(true);
        selectSitePage.selectSiteListItems.then((allSiteRows) => {
            allSiteRows.forEach((siteRow) => {
                 siteRow.getText().then((siteId: string) => {
                    allSiteIds.push(siteId);
                });
            });
        });
    });

    it('expect should have no sitelogs modified after initial loading', () => {
        console.log('Total number of sites found: ' + allSiteIds.length);
        expect(allSiteIds.length).toBeGreaterThan(0);

        let count: number = 0;
        allSiteIds.forEach((siteId: string) => {
            browser.waitForAngular();
            let siteLogPage: SiteLogPage = selectSitePage.openSite(siteId);
            browser.waitForAngular();

            siteLogPage.statusInfoBar.getText().then((statusInfo) => {
                if (statusInfo.includes('modified')) {
                    count += 1;
                    console.log(count + '. ' + siteId + ': modified');
                    siteLogPage.levelOneDirtyHeaders.then((dirtyGroups) => {
                        dirtyGroups.forEach((dirtyGroup) => {
                            let dirtyGroupHeader: ElementFinder = siteLogPage.getGroupHeader(dirtyGroup);
                            dirtyGroupHeader.click();
                            dirtyGroupHeader.getText().then((groupName) => {
                                console.log('    Modified group: ', groupName);
                                browser.waitForAngular();

                                siteLogPage.getDirtyItems(groupName).then((dirtyItems) => {
                                    dirtyItems.forEach((dirtyItem) => {
                                        let dirtyItemHeader: ElementFinder = siteLogPage.getItemHeader(dirtyItem);
                                        dirtyItemHeader.click();
                                        dirtyItemHeader.getText().then((itemName) => {
                                            console.log('        Modified item: ', itemName);
                                        });
                                        browser.waitForAngular();

                                        siteLogPage.getDirtyFields(dirtyItem).then((dirtyFields) => {
                                            dirtyFields.forEach((dirtyField) => {
                                                siteLogPage.getDirtyFieldInput(dirtyField).isPresent().then((isModified: boolean) => {
                                                    if (isModified) {
                                                        siteLogPage.getDirtyFieldLabel(dirtyField).getText().then((fieldName) => {
                                                            console.log('            Modified field: ', fieldName);
                                                        });
                                                    }
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
                expect(statusInfo).not.toContain('modified');
            });
            browser.waitForAngular();
            siteLogPage.closeAfterConfirmation();
        });
    });
});
