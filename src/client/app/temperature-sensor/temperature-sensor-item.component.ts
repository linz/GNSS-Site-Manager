import { Component, Input } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AbstractItemComponent, ItemControls } from '../shared/abstract-groups-items/abstract-item.component';
import { TemperatureSensorViewModel } from './temperature-sensor-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';

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

    constructor(protected userAuthService: UserAuthService, protected dialogService: DialogService,
                protected siteLogService: SiteLogService) {
        super(userAuthService, dialogService, siteLogService);
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
            {manufacturer: new FormControl(' ', [Validators.required, Validators.maxLength(50)])},
            {serialNumber: new FormControl(' ', [Validators.required, Validators.maxLength(25)])},
            {dataSamplingInterval: new FormControl('', [Validators.maxLength(25)])},
            {accuracyDegreesCelcius: new FormControl('', [Validators.maxLength(25)])},
            {heightDiffToAntenna: new FormControl('', [Validators.maxLength(25)])},
            {aspiration: new FormControl('', [Validators.maxLength(50)])},
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
