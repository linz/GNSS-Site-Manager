import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef, AfterContentInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractItem } from '../shared/abstract-groups-items/abstract-item';
import { GeodesyEvent } from '../shared/events-messages/Event';
import { GnssReceiverViewModel } from './gnss-receiver-view-model';
import { MiscUtils } from '../shared/global/misc-utils';
import { DialogService } from '../shared/index';

/**
 * This component represents a single GNSS Receiver.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-receiver-item',
    templateUrl: 'gnss-receiver-item.component.html',
})
export class GnssReceiverItemComponent extends AbstractItem implements OnInit, AfterContentInit {
    /**
     * The GnssReceiver in question.
     */
    @Input() gnssReceiver: GnssReceiverViewModel;

    constructor(protected dialogService: DialogService, private formBuilder: FormBuilder, private _changeDetectionRef : ChangeDetectorRef) {
        super(dialogService);
    }

    ngOnInit() {
        this.setupForm();
        this._changeDetectionRef.detectChanges();
        this.patchForm();
        this._changeDetectionRef.detectChanges();
    }

    ngAfterContentInit() {
        console.log('patch receiver - form: ', this.itemGroup.value);
        console.log('patch receiver - data: ', this.gnssReceiver);
    }

    private setupForm() {
        this.itemGroup = this.formBuilder.group({
            // turn off all Validators until work out solution to 'was false now true' problem
            // TODO Fix Validators
            receiverType: [''],//, [Validators.maxLength(100)]],
            manufacturerSerialNumber: [''],//, [Validators.maxLength(100)]],
            dateInstalled: [''],//, [Validators.required, dateTimeFormatValidator]],   // Validators.required,, dateTimeFormatValidator Validators.maxLength(19)
            dateRemoved: [''],//, [requiredIfNotCurrent="true" , dateTimeFormatValidator]],
            firmwareVersion: [''],//, [Validators.maxLength(100)]],
            satelliteSystem: [''],//, [Validators.maxLength(100)]],
            elevationCutoffSetting: [''],//, [Validators.maxLength(100)]],
            temperatureStabilization: [''],//, [Validators.maxLength(100)]],
            notes: [''],//, [Validators.maxLength(2000)]],
        });
        this.groupArray.push(this.itemGroup);
    }

    protected patchForm() {
        this.itemGroup.patchValue(this.gnssReceiver);
        // TODO - Validator Assistant
        // let out: any = dateTimeFormatValidator.apply(this, [this.itemGroup.controls['dateRemoved']]);
        // console.log('validate out: ', out);

        // let out2: any = Validators.required.apply(this, [this.itemGroup.controls['dateRemoved']]);
        // console.log('validate out 2: ', out2);
    }

    getItemName(): string {
        return 'GNSS Receiver';
    }
}
