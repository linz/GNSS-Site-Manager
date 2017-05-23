import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AbstractItemComponent, ItemControls } from '../shared/abstract-groups-items/abstract-item.component';
import { TemperatureSensorViewModel } from './temperature-sensor-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

/**
 * This component represents a single Temperature Sensor.
 */
@Component({
    moduleId: module.id,
    selector: 'temperature-sensor-item',
    templateUrl: 'temperature-sensor-item.component.html',
})
export class TemperatureSensorItemComponent extends AbstractItemComponent {
    /**
     * The TemperatureSensor in question.
     */
    @Input() temperatureSensor: TemperatureSensorViewModel;

    constructor(protected dialogService: DialogService, private formBuilder: FormBuilder) {
        super(dialogService);
    }

    getItemName(): string {
        return 'Temperature Sensor';
    }

    getItem(): AbstractViewModel {
        return this.temperatureSensor;
    }

    /**
     * Return the controls to become the form.
     *
     * @return array of AbstractControl objects
     */
    getFormControls(): ItemControls {
        return new ItemControls([
            {manufacturer: new FormControl('', [Validators.required, Validators.minLength(25)])},
            {serialNumber: new FormControl('', [Validators.required, Validators.minLength(25)])},
            {dataSamplingInterval: new FormControl('')},
            {accuracyDegreesCelcius: new FormControl('')},
            {heightDiffToAntenna: new FormControl('')},
            {calibrationDate: new FormControl('')},
            {startDate: new FormControl('')},   // Validators wont work in the DateTime custom component
            {endDate: new FormControl('')},
            {notes: new FormControl(['', [Validators.maxLength(2000)]])},
            {objectMap: new FormControl('')},
            {dateDeleted: new FormControl('')},
            {dateInserted: new FormControl('')},
            {deletedReason: new FormControl('')}
        ]);
    }

}
