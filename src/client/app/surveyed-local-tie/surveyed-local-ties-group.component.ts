import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group';
import { SurveyedLocalTieViewModel } from './surveyed-local-tie-view-model';

/**.
 * This class represents a group of Surveyed Local Ties.
 */
@Component({
    moduleId: module.id,
    selector: 'surveyed-local-ties-group',
    templateUrl: 'surveyed-local-ties-group.component.html',
})
export class SurveyedLocalTiesGroupComponent extends AbstractGroupComponent<SurveyedLocalTieViewModel> {
    static compare(obj1: SurveyedLocalTieViewModel, obj2: SurveyedLocalTieViewModel): number {
        let date1: string = obj1.dateMeasured;
        let date2: string = obj2.dateMeasured;
        return AbstractGroupComponent.compareDates(date1, date2);
    }

    @Input()
    set siteLogModel(siteLogModel: any) {
        if (siteLogModel) {
            this.setItemsCollection(siteLogModel.surveyedLocalTies);
            this.setupForm('surveyedLocalTies');
        }
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        if (originalSiteLogModel) {
            this.setItemsOriginalCollection(originalSiteLogModel.surveyedLocalTies);
        }
    }

    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    getItemName(): string {
        return 'Surveyed Local Tie';
    }

    compare(obj1: SurveyedLocalTieViewModel, obj2: SurveyedLocalTieViewModel): number {
        return SurveyedLocalTiesGroupComponent.compare(obj1, obj2);
    }

    /* **************************************************
     * Other methods
     */
    newItemViewModel(blank?: boolean): SurveyedLocalTieViewModel {
        return new SurveyedLocalTieViewModel();
    }
}
