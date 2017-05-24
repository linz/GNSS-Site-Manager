import { Component, Input } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AbstractItemComponent, ItemControls } from '../shared/abstract-groups-items/abstract-item.component';
import { PressureSensorViewModel } from './pressure-sensor-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This component represents a single Pressure Sensor.
 */
@Component({
    moduleId: module.id,
    selector: 'pressure-sensor-item',
    templateUrl: 'pressure-sensor-item.component.html',
})
export class PressureSensorItemComponent extends AbstractItemComponent {
    /**
     * The PressureSensor in question.
     */
    @Input() pressureSensor: PressureSensorViewModel;

    constructor(protected userAuthService: UserAuthService, protected dialogService: DialogService, protected siteLogService: SiteLogService) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'Pressure Sensor';
    }

    getItem(): AbstractViewModel {
        return this.pressureSensor;
    }

    /**
     * Return the controls to become the form.
     *
     * @return array of AbstractControl objects
     */
    getFormControls(): ItemControls {
        return new ItemControls([
            {manufacturer: new FormControl('', [Validators.required, Validators.minLength(100)])},
            {serialNumber: new FormControl('', [Validators.required, Validators.maxLength(100)])},
            {dataSamplingInterval: new FormControl('')},
            {accuracyHPa: new FormControl('')},
            {heightDiffToAntenna: new FormControl('')},
            {calibrationDate: new FormControl('')},
            {startDate: new FormControl('')},   // Validators wont work in the DateTime custom component
            {endDate: new FormControl('')},
            {notes: new FormControl('', [Validators.maxLength(2000)])},
            {objectMap: new FormControl('')},
            {dateDeleted: new FormControl('')},
            {dateInserted: new FormControl('')},
            {deletedReason: new FormControl('')}
        ]);
    }

}
