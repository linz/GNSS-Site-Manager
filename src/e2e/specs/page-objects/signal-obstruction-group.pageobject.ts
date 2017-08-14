import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';

export class SignalObstructionGroup extends LogItemGroup {

    readonly possibleProblemSourceInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="possibleProblemSource"] input'));
    readonly notesInput: ElementFinder = this.currentItemContainer
                    .element(by.css('textarea-input[controlName="notes"] textarea'));

    public constructor() {
        super('Signal Obstruction');
    }
}
