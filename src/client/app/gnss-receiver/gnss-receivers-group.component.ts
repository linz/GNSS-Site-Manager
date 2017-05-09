import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { GnssReceiverViewModel } from './gnss-receiver-view-model';

/**.
 * This class represents a group of GNSS Receivers.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-receivers-group',
    templateUrl: 'gnss-receivers-group.component.html',
})
export class GnssReceiversGroupComponent extends AbstractGroupComponent<GnssReceiverViewModel> {
    static compare(obj1: GnssReceiverViewModel, obj2: GnssReceiverViewModel): number {
        let date1: string = obj1.dateInstalled;
        let date2: string = obj2.dateInstalled;
        return AbstractGroupComponent.compareDates(date1, date2);
    }

    @Input()
    set siteLogModel(siteLogModel: any) {
       if (siteLogModel) {
           this.setItemsCollection(siteLogModel.gnssReceivers);
           this.setupForm('gnssReceivers');
       }
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        if (originalSiteLogModel) {
            this.setItemsOriginalCollection(originalSiteLogModel.gnssReceivers);
        }
    }

    constructor(protected formBuilder: FormBuilder) {
        super(formBuilder);
    }

    getItemName(): string {
        return 'GNSS Receiver';
    }

    compare(obj1: GnssReceiverViewModel, obj2: GnssReceiverViewModel): number {
        return GnssReceiversGroupComponent.compare(obj1, obj2);
    }

    /* **************************************************
     * Other methods
     */
    newItemViewModel(blank?: boolean): GnssReceiverViewModel {
        return new GnssReceiverViewModel(blank);
    }
}
