import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import * as _ from 'lodash';

export class LogItemGroup {

    readonly deletionReasonDialog: ElementFinder = element(by.cssContainingText('.dialog', 'Deletion Reason'));
    readonly deleteReasonInput: ElementFinder = this.deletionReasonDialog.element(by.css('input[type="text"]'));
    readonly confirmDeleteButton: ElementFinder = this.deletionReasonDialog.element(by.buttonText('OK'));

    readonly itemGroupHeader: ElementFinder;
    readonly items: ElementArrayFinder;
    readonly newItemButton: ElementFinder;
    readonly currentItemContainer: ElementFinder;
    readonly currentItemHeader: ElementFinder;
    readonly firstDeleteButton: ElementFinder;
    readonly newDateInstalledInput: ElementFinder;
    readonly prevDateRemovedInput: ElementFinder;

    public itemName: string;

    public constructor(itemName: string) {
        this.itemName = itemName;
        let elementName: string = _.kebabCase(itemName);
        this.items = element.all(by.css(elementName + '-item'));
        this.newItemButton = element(by.buttonText('New ' + this.itemName));
        this.itemGroupHeader = element(by.cssContainingText('span.panel-title', this.itemName + 's'));
        this.currentItemContainer = element(by.id(elementName + '-0'));
        this.currentItemHeader = element(by.cssContainingText('span.panel-title', 'Current ' + this.itemName));
        this.firstDeleteButton = this.currentItemContainer.element(by.buttonText('Delete'));
        this.newDateInstalledInput = this.currentItemContainer.element(by.css('datetime-input[controlName="startDate"] input'));
        this.prevDateRemovedInput = element(by.id(elementName + '-1')).element(by.css('datetime-input[controlName="endDate"] input'));
    }

    public addNewItem() {
        this.newItemButton.click().then(() => {
            console.log('Add a new ' + this.itemName + ' item');
        });
        browser.waitForAngular();
    }

    public deleteItem(itemIndex: number, deleteReason: string) {
        this.itemGroupHeader.click().then(() => {
            console.log('Open ' + this.itemName + 's group');
            browser.waitForAngular();

            this.firstDeleteButton.click().then(() => {
                console.log('Click "Delete" button');
            });
            browser.waitForAngular();

            this.deleteReasonInput.sendKeys(deleteReason);
            this.confirmDeleteButton.click().then(() => {
                console.log('Enter delete reason: ' + deleteReason);
            });
            browser.waitForAngular();
        });
    }
}
