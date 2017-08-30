import { browser } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { LoginActions } from '../utils/login.actions';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { GnssAntennaGroup } from '../page-objects/gnss-antenna-group.pageobject';

describe('GNSS Antenna Group Component', () => {

    let timestamp: string = TestUtils.getTimeStamp();
    let itemName: string = 'Frequency Standard';
    let siteId: string = 'ADE1';
    let antennaType: string = 'ASH700936B_L';
    let serialNumber: string = '1616';
    let antennaReferencePoint: string = 'BBPPAA';
    let markerArpEastEcc: string = '1';
    let markerArpUpEcc: string = '2';
    let markerArpNorthEcc: string = '3';
    let alignmentFromTrueNorth: string = '0';
    let antennaRadomeType: string = 'SNOW_1';
    let radomeSerialNumber: string = 'SNOW_Test';
    let antennaCableType: string = 'SNOW_2';
    let antennaCableLength: string = '100';
    let notes: string = 'e2e testing - add a new item ' + timestamp;
    let deleteReason: string = 'e2e testing - delete an item ' + timestamp;
    let noOfItems: number = 0;

    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);
    let siteLogPage: SiteLogPage;
    let itemGroup: GnssAntennaGroup;

    beforeAll(() => {
        browser.get(selectSitePage.url);
        browser.waitForAngular();
        loginActions.login('user.a', 'gumby123A');
        browser.waitForAngular();
        siteLogPage = selectSitePage.openSite(siteId);
        itemGroup = siteLogPage.gnssAntennaGroup;
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

            itemGroup.antennaTypeInput.sendKeys(antennaType);
            itemGroup.serialNumberInput.sendKeys(serialNumber);
            itemGroup.antennaReferencePointInput.sendKeys(antennaReferencePoint);
            itemGroup.markerArpEastEccInput.sendKeys(markerArpEastEcc);
            itemGroup.markerArpUpEccInput.sendKeys(markerArpUpEcc);
            itemGroup.markerArpNorthEccInput.sendKeys(markerArpNorthEcc);
            itemGroup.alignmentFromTrueNorthInput.sendKeys(alignmentFromTrueNorth);
            itemGroup.antennaRadomeTypeInput.sendKeys(antennaRadomeType);
            itemGroup.radomeSerialNumberInput.sendKeys(radomeSerialNumber);
            itemGroup.antennaCableTypeInput.sendKeys(antennaCableType);
            itemGroup.antennaCableLengthInput.sendKeys(antennaCableLength);
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

            TestUtils.checkInputValueEqual(itemGroup.antennaTypeInput, 'AntennaType', antennaType);
            TestUtils.checkInputValueEqual(itemGroup.serialNumberInput, 'SerialNumber', serialNumber);
            TestUtils.checkInputValueEqual(itemGroup.antennaReferencePointInput, 'AntennaReferencePoint', antennaReferencePoint);
            TestUtils.checkInputValueEqual(itemGroup.markerArpEastEccInput, 'MarkerArpEastEcc', markerArpEastEcc);
            TestUtils.checkInputValueEqual(itemGroup.markerArpUpEccInput, 'MarkerArpUpEcc', markerArpUpEcc);
            TestUtils.checkInputValueEqual(itemGroup.markerArpNorthEccInput, 'MarkerArpNorthEcc', markerArpNorthEcc);
            TestUtils.checkInputValueEqual(itemGroup.alignmentFromTrueNorthInput, 'AlignmentFromTrueNorth', alignmentFromTrueNorth);
            TestUtils.checkInputValueEqual(itemGroup.antennaRadomeTypeInput, 'AntennaRadomeType', antennaRadomeType);
            TestUtils.checkInputValueEqual(itemGroup.radomeSerialNumberInput, 'RadomeSerialNumber', radomeSerialNumber);
            TestUtils.checkInputValueEqual(itemGroup.antennaCableTypeInput, 'antennaCableType', antennaCableType);
            TestUtils.checkInputValueEqual(itemGroup.antennaCableLengthInput, 'AntennaCableLength', antennaCableLength);
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
