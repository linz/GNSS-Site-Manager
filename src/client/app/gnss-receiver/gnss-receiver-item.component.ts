import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, AbstractControl, Validators, FormGroup } from '@angular/forms';
import { AbstractItem } from '../shared/abstract-groups-items/abstract-item';
import { GnssReceiverViewModel } from './gnss-receiver-view-model';
import { DialogService } from '../shared/index';

/**
 * This component represents a single GNSS Receiver.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-receiver-item',
    templateUrl: 'gnss-receiver-item.component.html',
})
export class GnssReceiverItemComponent extends AbstractItem implements OnInit {
    /**
     * The GnssReceiver in question.
     */
    @Input() gnssReceiver: GnssReceiverViewModel;

    constructor(protected dialogService: DialogService, private formBuilder: FormBuilder) {
        super(dialogService);
    }

    public static setupForm(formBuilder: FormBuilder): FormGroup {
        let itemGroup: FormGroup = formBuilder.group({
            // turn off all Validators until work out solution to 'was false now true' problem
            // TODO Fix Validators
            receiverType: [''],//, [Validators.maxLength(100)]],
            manufacturerSerialNumber: [''],//, [Validators.maxLength(100)]],
            dateInstalled: [''],//, [Validators.required, dateTimeFormatValidator]],
            dateRemoved: [''],//, [requiredIfNotCurrent="true" , dateTimeFormatValidator]],
            firmwareVersion: [''],//, [Validators.maxLength(100)]],
            satelliteSystem: [''],//, [Validators.maxLength(100)]],
            elevationCutoffSetting: [''],//, [Validators.maxLength(100)]],
            temperatureStabilization: [''],//, [Validators.required]],//, [Validators.maxLength(100)]],
            notes: ['', [Validators.maxLength(2000)]],
            fieldMaps: '',
            dateDeleted: [''],
            dateInserted: [''],
            deletedReason: [''],
        });
        // console.debug('GnssReceiverItemComponent - setup (push) new form - index: ', this.getIndex());
        return itemGroup;
    }

    ngOnInit() {
        this.patchForm();
    }


    protected patchForm() {
        console.log(`receivers #${this.index} - setValue: `, this.gnssReceiver);
        this.itemGroup = <FormGroup> this.groupArray.at(this.index);
        this.itemGroup.setValue(this.gnssReceiver);
    }

    getItemName(): string {
        return 'GNSS Receiver';
    }
}
