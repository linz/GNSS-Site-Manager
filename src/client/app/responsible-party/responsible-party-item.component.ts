import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AbstractItemComponent, ItemControls } from '../shared/abstract-groups-items/abstract-item.component';
import { ResponsiblePartyViewModel } from './responsible-party-view-model';
import { ResponsiblePartyType } from './responsible-party-group.component';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { DialogService } from '../shared/global/dialog.service';

/**
 * This component represents a single Temperature Sensor.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-responsible-party-item',
    templateUrl: 'responsible-party-item.component.html',
})
export class ResponsiblePartyItemComponent extends AbstractItemComponent implements OnInit {
    /**
     * The ResponsibleParty in question.
     */
    @Input() responsibleParty: ResponsiblePartyViewModel;

    @Input() partyName: ResponsiblePartyType;

    constructor(protected dialogService: DialogService) {
        super(dialogService);
    }

    ngOnInit() {
        this.patchForm();
    }

    getItemName(): string {
        return this.partyName.getTitle();
    }

    getItem(): AbstractViewModel {
        return this.responsibleParty;
    }

    /**
     * Return the controls to become the form.
     *
     * @return array of AbstractControl objects
     */
    getFormControls(): ItemControls {
        // let itemGroup: FormGroup = formBuilder.group({
        // turn off all Validators until work out solution to 'was false now true' problem
        // TODO Fix Validators
        return new ItemControls([
            {individualName: new FormControl('')},//, [Validators.required, Validators.minLength(100)]],
            {organisationName: new FormControl('')},//, [Validators.required, Validators.maxLength(100)]],
            {positionName: new FormControl('')},
            {deliveryPoint1: new FormControl('')},
            {deliveryPoint2: new FormControl('')},
            {city: new FormControl('')},
            {administrativeArea: new FormControl('')},//, [Validators.required]],
            {postalCode: new FormControl('')},
            {country: new FormControl('')}, //, [Validators.maxLength(2000)]],
            {email1: new FormControl('')},
            {email2: new FormControl('')},
            {phone1: new FormControl('')},
            {phone2: new FormControl('')},
            {fax1: new FormControl('')},
            {fax2: new FormControl('')},
            {fieldMaps: new FormControl('')},
            {dateDeleted: new FormControl('')},
            {dateInserted: new FormControl('')},
            {deletedReason: new FormControl('')}
        ]);
    }

}
