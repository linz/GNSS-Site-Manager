import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';

export class OtherInstrumentationGroup extends LogItemGroup {

    readonly instrumentationInput: ElementFinder = this.currentItemContainer
                    .element(by.css('textarea-input[controlName="instrumentation"] textarea'));

    public constructor() {
        super('Other Instrumentation');
    }

    public getGroupName(): string {
        return this.itemName;
    }
}
