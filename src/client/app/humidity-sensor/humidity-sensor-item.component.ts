import { Component, Input } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AbstractItemComponent, ItemControls } from '../shared/abstract-groups-items/abstract-item.component';
import { HumiditySensorViewModel } from './humidity-sensor-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This component represents a single Humidity Sensor.
 */
@Component({
    moduleId: module.id,
    selector: 'humidity-sensor-item',
    templateUrl: 'humidity-sensor-item.component.html',
})
export class HumiditySensorItemComponent extends AbstractItemComponent {
    /**
     * The HumiditySensor in question.
     */
    @Input() humiditySensor: HumiditySensorViewModel;

    constructor(protected userAuthService: UserAuthService, protected dialogService: DialogService, protected siteLogService: SiteLogService) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'Humidity Sensor';
    }

    getItem(): AbstractViewModel {
        return this.humiditySensor;
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
            {manufacturer: new FormControl('', [Validators.required, Validators.minLength(50)])},
            {serialNumber: new FormControl('', [Validators.required, Validators.maxLength(50)])},
            {dataSamplingInterval: new FormControl('')},
            {accuracyPercentRelativeHumidity: new FormControl('')},
            {aspiration: new FormControl('')},
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
