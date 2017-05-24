import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AbstractItemComponent, ItemControls } from '../shared/abstract-groups-items/abstract-item.component';
import { SurveyedLocalTieViewModel } from './surveyed-local-tie-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This component represents a single Surveyed Local Tie.
 */
@Component({
    moduleId: module.id,
    selector: 'surveyed-local-tie-item',
    templateUrl: 'surveyed-local-tie-item.component.html',
})
export class SurveyedLocalTieItemComponent extends AbstractItemComponent {
    /**
     * The SurveyedLocalTie in question.
     */
    @Input() surveyedLocalTie: SurveyedLocalTieViewModel;

    constructor(protected userAuthService: UserAuthService, protected dialogService: DialogService,
                protected siteLogService: SiteLogService) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'Surveyed Local Tie';
    }

    getItem(): AbstractViewModel {
        return this.surveyedLocalTie;
    }

    /**
     * Return the controls to become the form.
     *
     * @return array of AbstractControl objects
     */
    getFormControls(): ItemControls {
        return new ItemControls([
            {tiedMarkerName: new FormControl('', [Validators.minLength(25)])},
            {tiedMarkerUsage: new FormControl('', [Validators.minLength(25)])},
            {tiedMarkerCDPNumber: new FormControl('', [Validators.minLength(25)])},
            {tiedMarkerDOMESNumber: new FormControl('', [Validators.minLength(25)])},
            {dx: new FormControl('', [Validators.minLength(25)])},
            {dy: new FormControl('', [Validators.minLength(25)])},
            {dz: new FormControl('', [Validators.minLength(25)])},
            {surveyMethod: new FormControl('', [Validators.minLength(25)])},
            {localSiteTiesAccuracy: new FormControl('', [Validators.minLength(25)])},
            {startDate: new FormControl('')},   // Validators wont work in the DateTime custom component
            // TODO see GEOD-454 endDate not needed by this component but the value exists in the model
            {endDate: new FormControl('')},
            {notes: new FormControl(['', [Validators.maxLength(2000)]])},
            {objectMap: new FormControl('')},
            {dateDeleted: new FormControl('')},
            {dateInserted: new FormControl('')},
            {deletedReason: new FormControl('')}
        ]);
    }
}
