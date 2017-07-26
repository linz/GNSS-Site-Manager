import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';

export class FrequencyStandardGroup extends LogItemGroup {

    readonly standardTypeInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="standardType"] input'));
    readonly inputFrequencyInput: ElementFinder = this.currentItemContainer
                    .element(by.css('number-input[controlName="inputFrequency"] input'));
    readonly notesInput: ElementFinder = this.currentItemContainer
                    .element(by.css('textarea-input[controlName="notes"] textarea'));

    public constructor() {
        super('Frequency Standard');
    }
}
