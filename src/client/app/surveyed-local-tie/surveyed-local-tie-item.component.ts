import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AbstractItem } from '../shared/abstract-groups-items/abstract-item';
import { SurveyedLocalTieViewModel } from './surveyed-local-tie-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

/**
 * This component represents a single Surveyed Local Tie.
 */
@Component({
    moduleId: module.id,
    selector: 'surveyed-local-tie-item',
    templateUrl: 'surveyed-local-tie-item.component.html',
})
export class SurveyedLocalTieItemComponent extends AbstractItem implements OnInit {
    /**
     * The SurveyedLocalTie in question.
     */
    @Input() surveyedLocalTie: SurveyedLocalTieViewModel;

    constructor(protected dialogService: DialogService, private formBuilder: FormBuilder) {
        super(dialogService);
    }

    ngOnInit() {
        this.patchForm();
    }

    getItemName(): string {
        return 'Surveyed Local Tie';
    }

    getItem(): AbstractViewModel {
        return this.surveyedLocalTie;
    }

    public static newFormInstance(formBuilder: FormBuilder): FormGroup {
        let itemGroup: FormGroup = formBuilder.group({
            // turn off all Validators until work out solution to 'was false now true' problem
            // TODO Fix Validators
            tiedMarkerName: [''],//, [Validators.required, Validators.maxLength(100)]],
            tiedMarkerUsage: [''],//, [Validators.maxLength(100)]],
            tiedMarkerCDPNumber: [''],//, [Validators.maxLength(100)]],
            tiedMarkerDOMESNumber: [''],//, [Validators.maxLength(100)]],
            dx: [''],//, [Validators.maxLength(100)]],
            dy: [''],//, [Validators.maxLength(100)]],
            dz: [''],//, [Validators.maxLength(100)]],
            surveyMethod: [''],//, [Validators.maxLength(100)]],
            localSiteTiesAccuracy: [''],//, [Validators.maxLength(100)]],
            dateMeasured: [''],//, [Validators.maxLength(100)]],
            notes: [''],//, [Validators.maxLength(2000)]],
            fieldMaps: '',
            dateDeleted: '',
            dateInserted: '',
            deletedReason: ''
        });
        return itemGroup;
    }
}
