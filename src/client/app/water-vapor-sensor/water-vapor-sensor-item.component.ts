import { Component, Input } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AbstractItemComponent, ItemControls } from '../shared/abstract-groups-items/abstract-item.component';
import { WaterVaporSensorViewModel } from './water-vapor-sensor-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This component represents a single WaterVapor Sensor.
 */
@Component({
    moduleId: module.id,
    selector: 'water-vapor-sensor-item',
    templateUrl: 'water-vapor-sensor-item.component.html',
})
export class WaterVaporSensorItemComponent extends AbstractItemComponent {
    /**
     * The WaterVaporSensor in question.
     */
    @Input() waterVaporSensor: WaterVaporSensorViewModel;

    constructor(protected userAuthService: UserAuthService, protected dialogService: DialogService,
                protected siteLogService: SiteLogService) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'Water Vapor Sensor';
    }

    getItem(): AbstractViewModel {
        return this.waterVaporSensor;
    }

    /**
     * Return the controls to become the form.
     *
     * @return array of AbstractControl objects
     */
    getFormControls(): ItemControls {
        return new ItemControls([
            {manufacturer: new FormControl('', [Validators.required, Validators.maxLength(25)])},
            {serialNumber: new FormControl('', [Validators.required, Validators.maxLength(25)])},
            {heightDiffToAntenna: new FormControl('', [Validators.maxLength(25)])},
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
