import { browser } from 'protractor';
import { TestUtils } from '../utils/test.utils';
import { SelectSitePage } from '../page-objects/select-site.pageobject';
import { LoginActions } from '../utils/login.actions';
import { SiteLogPage } from '../page-objects/site-log.pageobject';
import { ResponsiblePartyGroup } from '../page-objects/responsible-party-group.pageobject';
import { ResponsiblePartyViewModel } from '../../../client/app/responsible-party/responsible-party-view-model';
import { mockResponsibleParty } from './view-model';

/**
 * Two conditional tests based on the requirements (0 - n optional Site Contacts):
 * 1) If no SiteContact item, add a new one and fill with new values provided, and delete the new item at the end;
 * 2) Otherwise, change inputs with new values provided for the first item, and then change back to their original values
 */
describe('Responsible Party - Site Contact Group Component', () => {

    let viewModel: ResponsiblePartyViewModel = mockResponsibleParty;
    let backupModel: any = {};
    let itemName: string = 'Site Contact';
    let siteId: string = 'ADE1';
    let noOfItems: number = 0;
    let canAddNewItem: boolean = false;

    let selectSitePage: SelectSitePage = new SelectSitePage();
    let loginActions: LoginActions = new LoginActions(selectSitePage);
    let siteLogPage: SiteLogPage;
    let itemGroup: ResponsiblePartyGroup;

    beforeAll(() => {
        browser.get(selectSitePage.url);
        browser.waitForAngular();
        loginActions.login('user.a', 'gumby123A');
        browser.waitForAngular();
        siteLogPage = selectSitePage.openSite(siteId);
        itemGroup = siteLogPage.siteContactGroup;
        browser.waitForAngular();

        itemGroup.partyItems.count().then((value: number) => {
            canAddNewItem = (value === 0);
            noOfItems = value;
            console.log('Number of ' + itemGroup.itemName + ' items before testing: ' + value);
        });
        browser.waitForAngular();
    });

    it('expect should be able to add and save new ' + itemName + ' item', () => {
        if(canAddNewItem) {
            siteLogPage.siteInformationHeader.click();
            itemGroup.addNewItem();
            TestUtils.checkItemCount(itemGroup.partyItems, 'adding new item', noOfItems + 1);
            itemGroup.individualNameInput.sendKeys(viewModel.individualName);
            itemGroup.organisationNameInput.sendKeys(viewModel.organisationName);
            itemGroup.positionNameInput.sendKeys(viewModel.positionName);
            itemGroup.deliveryPointInput.sendKeys(viewModel.deliveryPoint);
            itemGroup.cityInput.sendKeys(viewModel.city);
            itemGroup.administrativeAreaInput.sendKeys(viewModel.administrativeArea);
            itemGroup.postalCodeInput.sendKeys(viewModel.postalCode);
            itemGroup.countryInput.sendKeys(viewModel.country);
            itemGroup.emailInput.sendKeys(viewModel.email);
            itemGroup.primaryPhoneInput.sendKeys(viewModel.primaryPhone);
            itemGroup.secondaryPhoneInput.sendKeys(viewModel.secondaryPhone);
            itemGroup.faxInput.sendKeys(viewModel.fax);
            browser.waitForAngular();
            siteLogPage.save();
        }
    });

    it('expect should have all values changed for the first ' + itemName + ' item', () => {
        if(!canAddNewItem) {
            siteLogPage.siteInformationHeader.click().then(() => {
                console.log('Open Site Information Header');
            });
            itemGroup.itemGroupHeader.click().then(() => {
                console.log('Open ' + itemGroup.itemName + ' group');
            });

            TestUtils.changeInputValue(itemGroup.individualNameInput, 'individualName', viewModel, backupModel);
            TestUtils.changeInputValue(itemGroup.organisationNameInput, 'organisationName', viewModel, backupModel);
            TestUtils.changeInputValue(itemGroup.positionNameInput, 'positionName', viewModel, backupModel);
            TestUtils.changeInputValue(itemGroup.deliveryPointInput, 'deliveryPoint', viewModel, backupModel);
            TestUtils.changeInputValue(itemGroup.cityInput, 'city', viewModel, backupModel);
            TestUtils.changeInputValue(itemGroup.administrativeAreaInput, 'administrativeArea', viewModel, backupModel);
            TestUtils.changeInputValue(itemGroup.postalCodeInput, 'postalCode', viewModel, backupModel);
            TestUtils.changeInputValue(itemGroup.countryInput, 'country', viewModel, backupModel);
            TestUtils.changeInputValue(itemGroup.emailInput, 'email', viewModel, backupModel);
            TestUtils.changeInputValue(itemGroup.primaryPhoneInput, 'primaryPhone', viewModel, backupModel);
            TestUtils.changeInputValue(itemGroup.secondaryPhoneInput, 'secondaryPhone', viewModel, backupModel);
            TestUtils.changeInputValue(itemGroup.faxInput, 'fax', viewModel, backupModel);

            siteLogPage.save();
            browser.waitForAngular();
        }
    });

    it('expect should have all new values saved for the new ' + itemName + ' item', () => {
        siteLogPage.reload(siteId);
        siteLogPage.siteInformationHeader.click();
        itemGroup.itemGroupHeader.click().then(() => {
            console.log('Open ' + itemGroup.itemName + ' group');
            browser.waitForAngular();
            TestUtils.checkInputValueEqual(itemGroup.individualNameInput, 'Individual Name', viewModel.individualName);
            TestUtils.checkInputValueEqual(itemGroup.organisationNameInput, 'Organisation Name', viewModel.organisationName);
            TestUtils.checkInputValueEqual(itemGroup.positionNameInput, 'Position Name', viewModel.positionName);
            TestUtils.checkInputValueEqual(itemGroup.deliveryPointInput, 'Address', viewModel.deliveryPoint);
            TestUtils.checkInputValueEqual(itemGroup.cityInput, 'City', viewModel.city);
            TestUtils.checkInputValueEqual(itemGroup.administrativeAreaInput, 'State / Province', viewModel.administrativeArea);
            TestUtils.checkInputValueEqual(itemGroup.postalCodeInput, 'Postal Code', viewModel.postalCode);
            TestUtils.checkInputValueEqual(itemGroup.countryInput, 'Country', viewModel.country);
            TestUtils.checkInputValueEqual(itemGroup.emailInput, 'Email', viewModel.email);
            TestUtils.checkInputValueEqual(itemGroup.primaryPhoneInput, 'Primary Phone Number', viewModel.primaryPhone);
            TestUtils.checkInputValueEqual(itemGroup.secondaryPhoneInput, 'Secondary Phone Number', viewModel.secondaryPhone);
            TestUtils.checkInputValueEqual(itemGroup.faxInput, 'Fax Number', viewModel.fax);
            console.log('All inputs have been changed to new values successfully.');
        });
    });

    it('expect should have all values changed back to original ones for the first ' + itemName + ' item', () => {
        if(!canAddNewItem) {
            TestUtils.changeInputValue(itemGroup.individualNameInput, 'individualName', backupModel);
            TestUtils.changeInputValue(itemGroup.organisationNameInput, 'organisationName', backupModel);
            TestUtils.changeInputValue(itemGroup.positionNameInput, 'positionName', backupModel);
            TestUtils.changeInputValue(itemGroup.deliveryPointInput, 'deliveryPoint', backupModel);
            TestUtils.changeInputValue(itemGroup.cityInput, 'city', backupModel);
            TestUtils.changeInputValue(itemGroup.administrativeAreaInput, 'administrativeArea', backupModel);
            TestUtils.changeInputValue(itemGroup.postalCodeInput, 'postalCode', backupModel);
            TestUtils.changeInputValue(itemGroup.countryInput, 'country', backupModel);
            TestUtils.changeInputValue(itemGroup.emailInput, 'email', backupModel);
            TestUtils.changeInputValue(itemGroup.primaryPhoneInput, 'primaryPhone', backupModel);
            TestUtils.changeInputValue(itemGroup.secondaryPhoneInput, 'secondaryPhone', backupModel);
            TestUtils.changeInputValue(itemGroup.faxInput, 'fax', backupModel);

            siteLogPage.save();
            browser.waitForAngular();
            console.log('Changed all values back to original ones for the first ' + itemName + ' item');
        }
    });

    it('expect should have all original values saved for the new ' + itemName + ' item', () => {
        if(!canAddNewItem) {
            siteLogPage.reload(siteId);
            siteLogPage.siteInformationHeader.click();
            itemGroup.itemGroupHeader.click().then(() => {
                console.log('Open ' + itemGroup.itemName + ' group');
                browser.waitForAngular();
                TestUtils.checkInputValueEqual(itemGroup.individualNameInput, 'Individual Name', backupModel.individualName);
                TestUtils.checkInputValueEqual(itemGroup.organisationNameInput, 'Organisation Name', backupModel.organisationName);
                TestUtils.checkInputValueEqual(itemGroup.positionNameInput, 'Position Name', backupModel.positionName);
                TestUtils.checkInputValueEqual(itemGroup.deliveryPointInput, 'Address', backupModel.deliveryPoint);
                TestUtils.checkInputValueEqual(itemGroup.cityInput, 'City', backupModel.city);
                TestUtils.checkInputValueEqual(itemGroup.administrativeAreaInput, 'State / Province', backupModel.administrativeArea);
                TestUtils.checkInputValueEqual(itemGroup.postalCodeInput, 'Postal Code', backupModel.postalCode);
                TestUtils.checkInputValueEqual(itemGroup.countryInput, 'Country', backupModel.country);
                TestUtils.checkInputValueEqual(itemGroup.emailInput, 'Email', backupModel.email);
                TestUtils.checkInputValueEqual(itemGroup.primaryPhoneInput, 'Primary Phone Number', backupModel.primaryPhone);
                TestUtils.checkInputValueEqual(itemGroup.secondaryPhoneInput, 'Secondary Phone Number', backupModel.secondaryPhone);
                TestUtils.checkInputValueEqual(itemGroup.faxInput, 'Fax Number', backupModel.fax);
                console.log('All inputs have been changed back to their original values successfully.');
            });
        }
    });

    it('expect should be able to delete a ' + itemName + ' item added previously', () => {
        if(canAddNewItem) {
            siteLogPage.reload(siteId);
            siteLogPage.siteInformationHeader.click();
            itemGroup.deleteItem(0);
            siteLogPage.save();
            siteLogPage.reload(siteId);
            TestUtils.checkItemCount(itemGroup.partyItems, 'deleting an item', noOfItems);
        }
    });
});
