import { Component, Input } from '@angular/core';
import { MiscUtils } from '../shared/index';
import { AbstractGroup } from '../shared/abstract-groups-items/abstract-group';
import { GnssReceiverViewModel } from './gnss-receiver-view-model';

/**.
 * This class represents a group of GNSS Receivers.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-receivers-group',
    templateUrl: 'gnss-receivers-group.component.html',
})
export class GnssReceiversGroupComponent extends AbstractGroup<GnssReceiverViewModel> {
    public miscUtils: any = MiscUtils;

    @Input()
    set siteLogModel(siteLogModel: any) {
        this.setItemsCollection(siteLogModel.gnssReceivers);
        console.log('GnssReceivers: ', this.getItemsCollection());
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        this.setItemsOriginalCollection(originalSiteLogModel.gnssReceivers);
        console.log('GnssReceivers (Original): ', this.getItemsOriginalCollection());
    }

    constructor() {
        super();
    }

    getItemName(): string {
        return 'GNSS Receiver';
    }

    compare(obj1: GnssReceiverViewModel, obj2: GnssReceiverViewModel): number {
        let date1: string = obj1.dateInstalled;
        let date2: string = obj2.dateInstalled;
        return AbstractGroup.compareDates(date1, date2);
    }

    /* **************************************************
     * Other methods
     */
    newViewModelItem(): GnssReceiverViewModel {
        return new GnssReceiverViewModel();
    }
}
