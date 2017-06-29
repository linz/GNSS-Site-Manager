import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';
import { BasePage } from '../page-objects/base.pageobject';

export class SiteLogPage extends BasePage {
    readonly urlAde1: string = '/siteLog/ADE1';
    readonly siteInformationHeader: ElementFinder = element(by.cssContainingText('span.panel-title', 'Site Information'));
    readonly siteIdentificationHeader: ElementFinder = element(by.cssContainingText('span.panel-title', 'Site Identification'));
    readonly siteGroupHeaders: ElementArrayFinder = element.all(by.css('div.group-header:not([hidden])>span.panel-title'));
    readonly siteItemHeaders: ElementArrayFinder = element.all(by.css('div.group-body:not([hidden]) div.item-header>span.panel-title'));
    public readonly siteNameInput: ElementFinder = element(by.css('site-identification text-input[formControlName="siteName"] input'));

    public identifyingElement(): ElementFinder {
        return this.siteInformationHeader;
    }
}
