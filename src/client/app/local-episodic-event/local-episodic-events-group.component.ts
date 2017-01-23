import {Component, Input} from '@angular/core';
import {MiscUtils} from '../shared/index';
import {AbstractGroup} from '../shared/abstract-groups-items/abstract-group';
import {LocalEpisodicEventViewModel} from './local-episodic-event-view-model';

/**.
 * This class represents a group of Local Episodic Effects.
 */
@Component({
    moduleId: module.id,
    selector: 'local-episodic-events-group',
    templateUrl: 'local-episodic-events-group.component.html',
})
export class LocalEpisodicEventsGroupComponent extends AbstractGroup<LocalEpisodicEventViewModel> {
    public miscUtils: any = MiscUtils;

    @Input()
    set siteLogModel(siteLogModel: any) {
        this.setItemsCollection(siteLogModel.localEpisodicEvents);
        console.log('LocalEpisodicEvents: ', this.getItemsCollection());
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        this.setItemsOriginalCollection(originalSiteLogModel.localEpisodicEvents);
        console.log('LocalEpisodicEvents (Original): ', this.getItemsOriginalCollection());
    }

    constructor() {
        super();
    }

    getItemName(): string {
        return 'Local Episodic Effect';
    }

    compare(obj1: LocalEpisodicEventViewModel, obj2: LocalEpisodicEventViewModel): number {
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroup.compareDates(date1, date2);
    }

    /* **************************************************
     * Other methods
     */
    newViewModelItem(): LocalEpisodicEventViewModel {
        return new LocalEpisodicEventViewModel();
    }
}
