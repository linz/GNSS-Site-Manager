import { by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';

/*
 * The Responsible-Party Group page object is shared by Site Owner, Site Contacts, Site Metadata Custodian,
 * Site Data Centers and Site Data Source groups under Site-Information
 */
export class ResponsiblePartyGroup extends LogItemGroup {

    readonly partyItems: ElementArrayFinder;
    public individualNameInput: ElementFinder;
    public organisationNameInput: ElementFinder;
    public positionNameInput: ElementFinder;
    public deliveryPointInput: ElementFinder;
    public cityInput: ElementFinder;
    public administrativeAreaInput: ElementFinder;
    public postalCodeInput: ElementFinder;
    public countryInput: ElementFinder;
    public emailInput: ElementFinder;
    public primaryPhoneInput: ElementFinder;
    public secondaryPhoneInput: ElementFinder;
    public faxInput: ElementFinder;
    public urlInput: ElementFinder;

    public constructor(partyName: string) {
        super(partyName);
        this.partyItems = element(by.cssContainingText('.panel-level-2', this.getGroupName()))
                         .all(by.css('gnss-responsible-party-item'));
        this.updateItemElements(0);  // by default, the new item is the first one before saving
    }

    public getGroupName(): string {
       let groupName: string = this.itemName;
       if (this.itemName === 'Site Contact' || this.itemName === 'Site Data Center') {
            groupName += 's';
       }
       return groupName;
    }

    public updateItemElements(itemIndex: number) {
        let itemContainer: ElementFinder = this.getItemContainer(itemIndex);
        this.individualNameInput = itemContainer.element(by.css('text-input[controlName="individualName"] input'));
        this.organisationNameInput = itemContainer.element(by.css('text-input[controlName="organisationName"] input'));
        this.positionNameInput = itemContainer.element(by.css('text-input[controlName="positionName"] input'));
        this.deliveryPointInput = itemContainer.element(by.css('textarea-input[controlName="deliveryPoint"] textarea'));
        this.cityInput = itemContainer.element(by.css('text-input[controlName="city"] input'));
        this.administrativeAreaInput = itemContainer.element(by.css('text-input[controlName="administrativeArea"] input'));
        this.postalCodeInput = itemContainer.element(by.css('text-input[controlName="postalCode"] input'));
        this.countryInput = itemContainer.element(by.css('text-input[controlName="country"] input'));
        this.emailInput = itemContainer.element(by.css('email-input[controlName="email"] input'));
        this.primaryPhoneInput = itemContainer.element(by.css('text-input[controlName="primaryPhone"] input'));
        this.secondaryPhoneInput = itemContainer.element(by.css('text-input[controlName="secondaryPhone"] input'));
        this.faxInput = itemContainer.element(by.css('text-input[controlName="fax"] input'));
        this.urlInput = itemContainer.element(by.css('url-input[controlName="url"] input'));
    }
}
