import { Component, Input } from '@angular/core';
import { MiscUtils } from '../shared/index';
import { AbstractGroup } from '../shared/abstract-groups-items/abstract-group';
import { SurveyedLocalTieViewModel } from './surveyed-local-tie-view-model';

/**.
 * This class represents a group of Surveyed Local Ties.
 */
@Component({
    moduleId: module.id,
    selector: 'surveyed-local-ties-group',
    templateUrl: 'surveyed-local-ties-group.component.html',
})
export class SurveyedLocalTiesGroupComponent extends AbstractGroup<SurveyedLocalTieViewModel> {
    public miscUtils: any = MiscUtils;

    @Input()
    set siteLogModel(siteLogModel: any) {
        this.setItemsCollection(siteLogModel.surveyedLocalTies);
        console.log('SurveyedLocalTies: ', this.getItemsCollection());
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        this.setItemsOriginalCollection(originalSiteLogModel.surveyedLocalTies);
        console.log('SurveyedLocalTies (Original): ', this.getItemsOriginalCollection());
    }

    constructor() {
        super();
    }

    getItemName(): string {
        return 'Surveyed Local Tie';
    }

    compare(obj1: SurveyedLocalTieViewModel, obj2: SurveyedLocalTieViewModel): number {
        let date1: string = obj1.dateMeasured;
        let date2: string = obj2.dateMeasured;
        return AbstractGroup.compareDates(date1, date2);
    }

    /* **************************************************
     * Other methods
     */
    newViewModelItem(): SurveyedLocalTieViewModel {
        return new SurveyedLocalTieViewModel();
    }
}
