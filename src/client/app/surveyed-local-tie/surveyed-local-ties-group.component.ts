import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { SurveyedLocalTieViewModel } from './surveyed-local-tie-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';

/**.
 * This class represents a group of Surveyed Local Ties.
 */
@Component({
    moduleId: module.id,
    selector: 'surveyed-local-ties-group',
    templateUrl: 'surveyed-local-ties-group.component.html',
})
export class SurveyedLocalTiesGroupComponent extends AbstractGroupComponent<SurveyedLocalTieViewModel> {

    constructor(protected userAuthService: UserAuthService, formBuilder: FormBuilder) {
        super(userAuthService, formBuilder);
    }

    getItemName(): string {
        return 'Surveyed Local Tie';
    }

    getControlName(): string {
        return 'surveyedLocalTies';
    }

    /* **************************************************
     * Other methods
     */
    newItemViewModel(): SurveyedLocalTieViewModel {
        return new SurveyedLocalTieViewModel();
    }

    protected hasEndDateField(): boolean {
        return false;
    }
}
