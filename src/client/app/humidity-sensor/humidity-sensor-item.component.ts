import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AbstractItem } from '../shared/abstract-groups-items/abstract-item';
import { HumiditySensorViewModel } from './humidity-sensor-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

/**
 * This component represents a single Humidity Sensor.
 */
@Component({
    moduleId: module.id,
    selector: 'humidity-sensor-item',
    templateUrl: 'humidity-sensor-item.component.html',
})
export class HumiditySensorItemComponent extends AbstractItem implements OnInit {
    /**
     * The HumiditySensor in question.
     */
    @Input() humiditySensor: HumiditySensorViewModel;

    constructor(protected dialogService: DialogService, private formBuilder: FormBuilder) {
        super(dialogService);
    }

    ngOnInit() {
        this.patchForm();
    }

    getItemName(): string {
        return 'Humidity Sensor';
    }

    getItem(): AbstractViewModel {
        return this.humiditySensor;
    }

    public static newFormInstance(formBuilder: FormBuilder): FormGroup {
        let itemGroup: FormGroup = formBuilder.group({
            // turn off all Validators until work out solution to 'was false now true' problem
            // TODO Fix Validators
            manufacturer: [''],//, [Validators.required, Validators.minLength(100)]],
            serialNumber: [''],//, [Validators.required, Validators.maxLength(100)]],
            dataSamplingInterval: ['', []],
            accuracyPercentRelativeHumidity: ['', []],
            aspiration: ['', []],
            heightDiffToAntenna: ['', []],
            calibrationDate: ['', []],
            startDate: [''],//, [Validators.required]],
            endDate: ['', []],  // requiredIfNotCurrent="true"
            notes: [''],//, [Validators.maxLength(2000)]],
            fieldMaps: '',
            dateDeleted: '',
            dateInserted: '',
            deletedReason: ''
        });
        return itemGroup;
    }
}
