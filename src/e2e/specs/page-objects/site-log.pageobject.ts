import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { BasePage } from './base.pageobject';
import { FrequencyStandardGroup } from './frequency-standard-group.pageobject';

export class SiteLogPage extends BasePage {
    readonly siteInformationHeader: ElementFinder = element(by.cssContainingText('span.panel-title', 'Site Information'));
    readonly siteIdentificationHeader: ElementFinder = element(by.cssContainingText('span.panel-title', 'Site Identification'));
    readonly siteGroupHeaders: ElementArrayFinder = element.all(by.css('div.group-header:not([hidden])>span.panel-title'));
    readonly siteItemHeaders: ElementArrayFinder = element.all(by.css('div.group-body:not([hidden]) div.item-header>span.panel-title'));
    readonly siteNameInput: ElementFinder = element(by.css('site-identification text-input[controlName="siteName"] input'));
    readonly confirmYesButton: ElementFinder = element(by.buttonText('Yes'));

    readonly frequencyStandardGroup = new FrequencyStandardGroup();

    public identifyingElement(): ElementFinder {
        return this.siteInformationHeader;
    }

    public save() {
        this.siteIdMenu.click();
        this.saveSiteLink.click().then(() => {
            console.log('Clicked "Save" button');
        });

        this.confirmYesButton.click().then(() => {
            console.log('Clicked "Yes" button to save all changes made');
        });
        browser.waitForAngular();
    }

    public revert() {
        this.siteIdMenu.click();
        this.revertSiteLink.click().then(() => {
            console.log('Clicked "Revert" button to reload the site log page');
        });

        this.confirmYesButton.click().then(() => {
            console.log('Clicked "Yes" button to conduct the reload of the site log page');
        });
    }

    /*
     * Reload the site log page with given siteId
     *
     * Note: window.location.reload() won't work here
     */
    public reload(siteId: string) {
        browser.get('/siteLog/' + siteId);
        console.log('Loaded ' + siteId + ' sitelog page.');
        browser.waitForAngular();
    }

    public close() {
        this.siteIdMenu.click();
        this.closeSiteLink.click().then(() => {
            console.log('Close site-log page');
        });
    }
}
