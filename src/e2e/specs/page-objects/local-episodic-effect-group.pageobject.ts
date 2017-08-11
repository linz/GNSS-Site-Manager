import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from '../page-objects/log-item-group.pageobject';

export class LocalEpisodicEffectGroup extends LogItemGroup {

    readonly eventInput: ElementFinder = this.currentItemContainer
                    .element(by.css('text-input[controlName="event"] input'));

    public constructor() {
        super('Local Episodic Effect');
    }
}
