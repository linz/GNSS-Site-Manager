import { Component, Input } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AbstractItemComponent, ItemControls } from '../shared/abstract-groups-items/abstract-item.component';
import { GnssAntennaViewModel } from './gnss-antenna-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**
 * This class represents a single item of GNSS Antennas.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-antenna-item',
    templateUrl: 'gnss-antenna-item.component.html',
})
export class GnssAntennaItemComponent extends AbstractItemComponent {
    /**
     * The GNSS Antenna in question.
     */
    @Input() antenna: GnssAntennaViewModel;

    constructor(protected userAuthService: UserAuthService, protected dialogService: DialogService, protected siteLogService: SiteLogService) {
        super(userAuthService, dialogService, siteLogService);
    }

    getItemName(): string {
        return 'GNSS Antenna';
    }

    getItem(): AbstractViewModel {
        return this.antenna;
    }

    /**
     * Return the controls to become the form.
     *
     * @return array of AbstractControl objects
     */
    getFormControls(): ItemControls {
        return new ItemControls([
            {antennaType: new FormControl('', [Validators.maxLength(100)])},
            {serialNumber: new FormControl('', [Validators.minLength(4)])},
            {startDate: new FormControl('')},   // Validators wont work in the DateTime custom component
            {endDate: new FormControl('')},
            {antennaReferencePoint: new FormControl(' ', [Validators.required])},
            {markerArpEastEcc: new FormControl('', [Validators.maxLength(100)])},
            {markerArpUpEcc: new FormControl('', [Validators.maxLength(100)])},
            {markerArpNorthEcc: new FormControl('', [Validators.maxLength(100)])},
            {alignmentFromTrueNorth: new FormControl('', [Validators.maxLength(100)])},
            {antennaRadomeType: new FormControl('', [Validators.maxLength(100)])},
            {radomeSerialNumber: new FormControl('', [Validators.maxLength(100)])},
            {antennaCableType: new FormControl('', [Validators.maxLength(100)])},
            {antennaCableLength: new FormControl('', [Validators.maxLength(100)])},
            {notes: new FormControl('', [Validators.maxLength(2000)])},
            {objectMap: new FormControl('')},
            {dateDeleted: new FormControl('')},
            {dateInserted: new FormControl('')},
            {deletedReason: new FormControl('')}
        ]);
    }
}
