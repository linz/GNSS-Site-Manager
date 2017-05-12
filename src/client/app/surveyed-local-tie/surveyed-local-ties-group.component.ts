import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
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
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroupComponent.compareDates(date1, date2);
    }

    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    getItemName(): string {
        return 'Surveyed Local Tie';
    }

    getControlName(): string {
        return 'surveyedLocalTies';
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
