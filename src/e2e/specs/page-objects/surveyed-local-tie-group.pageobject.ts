import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';

export class SurveyedLocalTieGroup extends LogItemGroup {

    readonly tiedMarkerNameInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="tiedMarkerName"] input'));
    readonly tiedMarkerUsageInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="tiedMarkerUsage"] input'));
    readonly tiedMarkerCDPNumberInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="tiedMarkerCDPNumber"] input'));
    readonly tiedMarkerDOMESNumberInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="tiedMarkerDOMESNumber"] input'));
    readonly dxInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="dx"] input'));
    readonly dyInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="dy"] input'));
    readonly dzInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="dz"] input'));
    readonly localSiteTiesAccuracyInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="localSiteTiesAccuracy"] input'));
    readonly surveyMethodInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="surveyMethod"] input'));
    readonly notesInput: ElementFinder = this.currentItemContainer
                    .element(by.css('textarea-input[controlName="notes"] textarea'));

    public constructor() {
        super('Surveyed Local Tie');
    }
}
