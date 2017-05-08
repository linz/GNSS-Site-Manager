import { Component, Input } from '@angular/core';
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
    static compare(obj1: GnssAntennaViewModel, obj2: GnssAntennaViewModel): number {
        let date1: string = obj1.dateInstalled;
        let date2: string = obj2.dateInstalled;
        return AbstractGroupComponent.compareDates(date1, date2);
    }

    @Input()
    set siteLogModel(siteLogModel: any) {
        if (siteLogModel) {
            this.setItemsCollection(siteLogModel.gnssAntennas);
            this.setupForm('gnssAntennas');
        }
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        if (originalSiteLogModel) {
            this.setItemsOriginalCollection(originalSiteLogModel.gnssAntennas);
        }
    }

    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    getItemName(): string {
        return 'GNSS Antenna';
    }

    compare(obj1: GnssAntennaViewModel, obj2: GnssAntennaViewModel): number {
        return GnssAntennaGroupComponent.compare(obj1, obj2);
    }

    newItemViewModel(blank?: boolean): GnssAntennaViewModel {
        return new GnssAntennaViewModel(blank);
    }
}
