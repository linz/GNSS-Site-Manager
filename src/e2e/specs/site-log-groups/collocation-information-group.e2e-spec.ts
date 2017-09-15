import { browser } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { LoginActions } from '../utils/login.actions';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { CollocationInformationGroup } from '../page-objects/collocation-information-group.pageobject';

describe('Collocation Information Group Component', () => {

    let timestamp: string = TestUtils.getTimeStamp();
    let siteId: string = 'ADE1';
    let instrumentationType: string = 'Unknown';
    let status: string = 'OK';
    let notes: string = 'e2e testing - add a new item ' + timestamp;
    let deleteReason: string = 'e2e testing - delete an item ' + timestamp;
    let noOfItems: number = 0;

    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);
    let siteLogPage: SiteLogPage;
    let itemGroup: CollocationInformationGroup;

    beforeAll(() => {
        browser.get(selectSitePage.url);
        browser.waitForAngular();
        loginActions.login('user.a', 'gumby123A');
        browser.waitForAngular();
        siteLogPage = selectSitePage.openSite(siteId);
        itemGroup = siteLogPage.collocationInformationGroup;
        itemGroup.items.count().then((value: number) => {
            noOfItems = value;
            console.log('Number of ' + itemGroup.itemName + ' items before adding new item: ' + value);
        });    });

    it('expect should be able to add and save a new item', () => {
            browser.waitForAngular();
            itemGroup.addNewItem();
            TestUtils.checkInputValueNotNull(itemGroup.newDateInstalledInput, 'current DateInstalled');
            if(noOfItems > 0) {
                TestUtils.checkInputValueNotNull(itemGroup.prevDateRemovedInput, 'previous DateRemoved');
            }

            itemGroup.instrumentationTypeInput.sendKeys(instrumentationType);
            itemGroup.statusInput.sendKeys(status);
            itemGroup.notesInput.sendKeys(notes);
            browser.waitForAngular();
            siteLogPage.save();
    });

    it('expect should have all input values for the new item created previously', () => {
        siteLogPage.reload(siteId);
        TestUtils.checkItemCount(itemGroup.items, 'adding new item', noOfItems + 1);
        itemGroup.itemGroupHeader.click().then(() => {
            console.log('Open ' + itemGroup.itemName + 's group');
            browser.waitForAngular();

            itemGroup.currentItemHeader.click().then(() => {
                console.log('Open the first ' + itemGroup.itemName + ' item');
            });
            browser.waitForAngular();

            TestUtils.checkInputValueEqual(itemGroup.instrumentationTypeInput, 'Instrumentation Type', instrumentationType);
            TestUtils.checkInputValueEqual(itemGroup.statusInput, 'status', status);
            TestUtils.checkInputValueEqual(itemGroup.notesInput, 'Notes', notes);
        });
    });

    it('expect should be able to delete an item', () => {
        siteLogPage.reload(siteId);
        itemGroup.deleteItem(deleteReason);
        siteLogPage.save();
        siteLogPage.reload(siteId);
        TestUtils.checkItemCount(itemGroup.items, 'deleting an item', noOfItems);
    });
});
