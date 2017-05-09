import { Component, Input, OnInit, Injector } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AbstractItemComponent, ItemControls } from '../shared/abstract-groups-items/abstract-item.component';
import { GnssAntennaViewModel } from './gnss-antenna-view-model';
import { DialogService } from '../shared/index';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

/**
 * This class represents a single item of GNSS Antennas.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-antenna-item',
    templateUrl: 'gnss-antenna-item.component.html',
})
export class GnssAntennaItemComponent extends AbstractItemComponent implements OnInit {
    /**
     * The GNSS Antenna in question.
     */
    @Input() antenna: GnssAntennaViewModel;

    constructor(protected dialogService: DialogService) {
        super(dialogService);
    }

    ngOnInit() {
        this.patchForm();
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
        // let itemGroup: FormGroup = formBuilder.group({
        // turn off all Validators until work out solution to 'was false now true' problem
        // TODO Fix Validators
        return new ItemControls([
            {antennaType: new FormControl('')},//, [Validators.maxLength(100)]],
            {serialNumber: new FormControl('')},//, [Validators.maxLength(100)]],
            {dateInstalled: new FormControl('')},//, [Validators.required, dateTimeFormatValidator]],
            {dateRemoved: new FormControl('')},    // requiredIfNotCurrent="true"
            {antennaReferencePoint: new FormControl('')},//, [Validators.maxLength(100)]],
            {markerArpEastEcc: new FormControl('')},//, [Validators.maxLength(100)]],
            {markerArpUpEcc: new FormControl('')},//, [Validators.maxLength(100)]],
            {markerArpNorthEcc: new FormControl('')},//, [Validators.maxLength(100)]],
            {alignmentFromTrueNorth: new FormControl('')},//, [Validators.maxLength(100)]],
            {antennaRadomeType: new FormControl('')},//, [Validators.maxLength(100)]],
            {radomeSerialNumber: new FormControl('')},//, [Validators.maxLength(100)]],
            {antennaCableType: new FormControl('')},//, [Validators.maxLength(100)]],
            {antennaCableLength: new FormControl('')},//, [Validators.maxLength(100)]],
            {notes: new FormControl(['', [Validators.maxLength(2000)]])},
            {fieldMaps: new FormControl('')},
            {dateDeleted: new FormControl('')},
            {dateInserted: new FormControl('')},
            {deletedReason: new FormControl('')}
        ]);
    }
}
