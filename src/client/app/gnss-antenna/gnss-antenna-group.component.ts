import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { GnssAntennaViewModel } from './gnss-antenna-view-model';

/**
 * This class represents a collection of GNSS Antenna items.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-antenna-group',
    templateUrl: 'gnss-antenna-group.component.html',
})
export class GnssAntennaGroupComponent extends AbstractGroupComponent<GnssAntennaViewModel> {
    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    getItemName(): string {
        return 'GNSS Antenna';
    }

    getControlName(): string {
        return 'gnssAntennas';
    }

    getFormData(siteLog: any): any {
        return siteLog.gnssAntennas;
    }

    compare(obj1: GnssAntennaViewModel, obj2: GnssAntennaViewModel): number {
        return GnssAntennaGroupComponent.compare(obj1, obj2);
    }

    newItemViewModel(blank?: boolean): GnssAntennaViewModel {
        return new GnssAntennaViewModel(blank);
    }
}
