import { browser } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { LoginActions } from '../utils/login.actions';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { GnssReceiverGroup } from '../page-objects/gnss-receiver-group.pageobject';

describe('GNSS Receiver Group Component', () => {

    let timestamp: string = TestUtils.getTimeStamp();
    let itemName: string = 'GNSS Receiver';
    let siteId: string = 'ADE1';
    let receiverType: string = 'ASHTECH Z-XII3';
    let serialNumber: string = '8888';
    let firmwareVersion: string = '8Y08-8D08';
    let elevationCutoffSetting: string = '5';
    let temperatureStabilization: string = '10';
    let notes: string = 'e2e testing - add a new item ' + timestamp;
    let deleteReason: string = 'e2e testing - delete an item ' + timestamp;
    let noOfItems: number = 0;

    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);
    let siteLogPage: SiteLogPage;
    let itemGroup: GnssReceiverGroup;

    beforeAll(() => {
        browser.get(selectSitePage.url);
        browser.waitForAngular();
        loginActions.login('user.a', 'gumby123A');
        browser.waitForAngular();
        siteLogPage = selectSitePage.openSite(siteId);
        itemGroup = siteLogPage.gnssReceiverGroup;
    });

    it('expect should be able to add and save new ' + itemName + ' item', () => {
        expect(siteLogPage.saveSiteLink.isPresent()).toBe(true);
        expect(siteLogPage.saveSiteLink.getAttribute('class')).toContain('disabled', 'Save button is not enabled as no changes made');
        itemGroup.items.count().then((value: number) => {
            noOfItems = value;
            console.log('Number of ' + itemGroup.itemName + ' items before adding new item: ' + value);
            browser.waitForAngular();

            itemGroup.addNewItem();
            TestUtils.checkItemCount(itemGroup.items, 'adding new item', noOfItems + 1);
            TestUtils.checkInputValueNotNull(itemGroup.newDateInstalledInput, 'current DateInstalled');
            if(noOfItems > 0) {
                TestUtils.checkInputValueNotNull(itemGroup.prevDateRemovedInput, 'previous DateRemoved');
            }

            itemGroup.receiverTypeInput.sendKeys(receiverType);
            itemGroup.serialNumberInput.sendKeys(serialNumber);
            itemGroup.firmwareVersionInput.sendKeys(firmwareVersion);
            itemGroup.elevationCutoffSettingInput.sendKeys(elevationCutoffSetting);
            itemGroup.temperatureStabilizationInput.sendKeys(temperatureStabilization);
            itemGroup.notesInput.sendKeys(notes);
            browser.waitForAngular();
            siteLogPage.save();
        });
    });

    it('expect should have all input values for the new ' + itemName + ' item created previously', () => {
        siteLogPage.reload(siteId);
        itemGroup.itemGroupHeader.click().then(() => {
            console.log('Open ' + itemGroup.itemName + 's group');
            browser.waitForAngular();

            itemGroup.currentItemHeader.click().then(() => {
                console.log('Open the first ' + itemGroup.itemName + ' item');
            });
            browser.waitForAngular();

            TestUtils.checkInputValueEqual(itemGroup.receiverTypeInput, 'ReceiverType', receiverType);
            TestUtils.checkInputValueEqual(itemGroup.serialNumberInput, 'SerialNumber', serialNumber);
            TestUtils.checkInputValueEqual(itemGroup.firmwareVersionInput, 'FirmwareVersion', firmwareVersion);
            TestUtils.checkInputValueEqual(itemGroup.elevationCutoffSettingInput, 'ElevationCutoffSetting', elevationCutoffSetting);
            TestUtils.checkInputValueEqual(itemGroup.temperatureStabilizationInput, 'TemperatureStabilization', temperatureStabilization);
            TestUtils.checkInputValueEqual(itemGroup.notesInput, 'Notes', notes);
        });
    });

    it('expect should be able to delete a ' + itemName + ' item', () => {
        siteLogPage.reload(siteId);
        itemGroup.deleteItem(deleteReason);
        siteLogPage.save();
        siteLogPage.reload(siteId);
        TestUtils.checkItemCount(itemGroup.items, 'deleting an item', noOfItems);
    });
});
