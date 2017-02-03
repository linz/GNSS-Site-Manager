import {Component, Input} from '@angular/core';
import {MiscUtils} from '../shared/index';
import {AbstractGroup} from '../shared/abstract-groups-items/abstract-group';
import {LocalEpisodicEffectViewModel} from './local-episodic-effect-view-model';

/**.
 * This class represents a group of Local Episodic Effects.
 */
@Component({
    moduleId: module.id,
    selector: 'local-episodic-effects-group',
    templateUrl: 'local-episodic-effects-group.component.html',
})
export class LocalEpisodicEffectsGroupComponent extends AbstractGroup<LocalEpisodicEffectViewModel> {
    public miscUtils: any = MiscUtils;

    @Input()
    set siteLogModel(siteLogModel: any) {
        this.setItemsCollection(siteLogModel.localEpisodicEffects);
        console.log('LocalEpisodicEffects: ', this.getItemsCollection());
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        this.setItemsOriginalCollection(originalSiteLogModel.localEpisodicEffects);
        console.log('LocalEpisodicEffects (Original): ', this.getItemsOriginalCollection());
    }

    constructor() {
        super();
    }

    getItemName(): string {
        return 'Local Episodic Effect';
    }

    compare(obj1: LocalEpisodicEffectViewModel, obj2: LocalEpisodicEffectViewModel): number {
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroup.compareDates(date1, date2);
    }

    /* **************************************************
     * Other methods
     */
    newViewModelItem(): LocalEpisodicEffectViewModel {
        return new LocalEpisodicEffectViewModel();
    }
}
