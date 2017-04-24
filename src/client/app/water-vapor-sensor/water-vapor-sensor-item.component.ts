import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AbstractItem } from '../shared/abstract-groups-items/abstract-item';
import { WaterVaporSensorViewModel } from './water-vapor-sensor-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

/**
 * This component represents a single WaterVapor Sensor.
 */
@Component({
    moduleId: module.id,
    selector: 'water-vapor-sensor-item',
    templateUrl: 'water-vapor-sensor-item.component.html',
})
export class WaterVaporSensorItemComponent extends AbstractItem implements OnInit {
    /**
     * The WaterVaporSensor in question.
     */
    @Input() waterVaporSensor: WaterVaporSensorViewModel;

    constructor(protected dialogService: DialogService, private formBuilder: FormBuilder) {
        super(dialogService);
    }

    ngOnInit() {
        this.patchForm();
    }

    getItemName(): string {
        return 'Water Vapor Sensor';
    }

    getItem(): AbstractViewModel {
        return this.waterVaporSensor;
    }


    public static newFormInstance(formBuilder: FormBuilder): FormGroup {
        let itemGroup: FormGroup = formBuilder.group({
            // turn off all Validators until work out solution to 'was false now true' problem
            // TODO Fix Validators
            manufacturer: [''],//, [Validators.required, Validators.minLength(100)]],
            serialNumber: [''],//, [Validators.required, Validators.maxLength(100)]],
            heightDiffToAntenna: [''],
            calibrationDate: [''],
            startDate: [''],//, [Validators.required]],
            endDate: [''],  // requiredIfNotCurrent="true"
            notes: [''],//, [Validators.maxLength(2000)]],
            fieldMaps: '',
            dateDeleted: '',
            dateInserted: '',
            deletedReason: ''
        });
        return itemGroup;
    }
}
