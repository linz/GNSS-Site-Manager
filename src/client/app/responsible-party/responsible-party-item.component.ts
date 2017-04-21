import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AbstractItem } from '../shared/abstract-groups-items/abstract-item';
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
export class ResponsiblePartyItemComponent extends AbstractItem implements OnInit {
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

    public static newFormInstance(formBuilder: FormBuilder): FormGroup {
        let itemGroup: FormGroup = formBuilder.group({
            // turn off all Validators until work out solution to 'was false now true' problem
            // TODO Fix Validators

            individualName: [''],//, [Validators.required, Validators.minLength(100)]],
            organisationName: [''],//, [Validators.required, Validators.maxLength(100)]],
            positionName: ['', []],
            deliveryPoint1: ['', []],
            deliveryPoint2: ['', []],
            city: ['', []],
            administrativeArea: [''],//, [Validators.required]],
            postalCode: ['', []],
            country: [''], //, [Validators.maxLength(2000)]],
            email1: '',
            email2: '',
            phone1: '',
            phone2: '',
            fax1: '',
            fax2: '',
            fieldMaps: '',
            dateInserted: '',
            dateDeleted: '',
            deletedReason: ''
        });
        return itemGroup;
    }
}
