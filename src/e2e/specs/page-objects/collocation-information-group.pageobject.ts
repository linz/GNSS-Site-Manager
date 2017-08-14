import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';

export class CollocationInformationGroup extends LogItemGroup {

    readonly instrumentationTypeInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="instrumentationType"] input'));
    readonly statusInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="status"] input'));
    readonly notesInput: ElementFinder = this.currentItemContainer
                    .element(by.css('textarea-input[controlName="notes"] textarea'));

    public constructor() {
        super('Collocation Information');
    }

    public getGroupName(): string {
        return this.itemName;
    }
}
