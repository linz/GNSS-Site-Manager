import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { AbstractGroup, sortingDirectionAscending } from '../shared/abstract-groups-items/abstract-group';
import { GnssReceiverViewModel } from './gnss-receiver-view-model';

/**.
 * This class represents a group of GNSS Receivers.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-receivers-group',
    templateUrl: 'gnss-receivers-group.component.html',
})
export class GnssReceiversGroupComponent extends AbstractGroup<GnssReceiverViewModel> implements OnInit {
   @Input()
    set siteLogModel(siteLogModel: any) {
       this._siteLogModel = siteLogModel;
       siteLogModel && this.setItemsCollection(siteLogModel.gnssReceivers);
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        originalSiteLogModel && this.setItemsOriginalCollection(originalSiteLogModel.gnssReceivers);
    }

    constructor() {
        super();
    }

    ngOnInit() {
        this.setupForm();
    }

    private setupForm() {
        this.groupArrayForm = new FormArray([]);
        this.siteInfoForm.addControl('gnssReceivers', this.groupArrayForm);
    }

    getItemName(): string {
        return 'GNSS Receiver';
    }

    compare(obj1: GnssReceiverViewModel, obj2: GnssReceiverViewModel): number {
        let date1: string = obj1.dateInstalled;
        let date2: string = obj2.dateInstalled;
        let val: number = AbstractGroup.compareDates(date1, date2);
        console.debug(`GnssReceiversGroupComponent - sort ${date1}, ${date2} - ${val}`);
        return val;
    }

    /* **************************************************
     * Other methods
     */
    newViewModelItem(blank?: boolean): GnssReceiverViewModel {
        return new GnssReceiverViewModel(blank);
    }
}
