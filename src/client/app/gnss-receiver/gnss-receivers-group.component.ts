import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AbstractGroup, sortingDirectionAscending } from '../shared/abstract-groups-items/abstract-group';
import { GnssReceiverViewModel } from './gnss-receiver-view-model';
import { GnssReceiverItemComponent } from './gnss-receiver-item.component';

/**.
 * This class represents a group of GNSS Receivers.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-receivers-group',
    templateUrl: 'gnss-receivers-group.component.html',
})
export class GnssReceiversGroupComponent extends AbstractGroup<GnssReceiverViewModel> implements OnInit {
    static compare(obj1: GnssReceiverViewModel, obj2: GnssReceiverViewModel): number {
        let date1: string = obj1.dateInstalled;
        let date2: string = obj2.dateInstalled;
        let val: number = AbstractGroup.compareDates(date1, date2);
        // console.debug(`GnssReceiversGroupComponent - sort ${date1}, ${date2} - ${val}`);
        return val;
    }

    @Input()
    set siteLogModel(siteLogModel: any) {
       if (siteLogModel) {
           this.setItemsCollection(siteLogModel.gnssReceivers);
           this.setupForm();
       }
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        originalSiteLogModel && this.setItemsOriginalCollection(originalSiteLogModel.gnssReceivers);
    }

    constructor(private formBuilder: FormBuilder) {
        super();
    }

    ngOnInit() {
        // This is happening too early before itemProperties are set
        // this.setupForm();
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
    newViewModelItem(blank?: boolean): GnssReceiverViewModel {
        return new GnssReceiverViewModel(blank);
    }

    private setupForm() {
        this.groupArrayForm = this.formBuilder.array([]);
        this.siteInfoForm.addControl('gnssReceivers', this.groupArrayForm);

        this.setupChildItems();
    }

    private setupChildItems() {
        for (let viewModel of this.getItemsCollection()) {
            this.addChildItemToForm();
        }
    }

    protected addChildItemToForm() {
        let itemGroup: FormGroup = GnssReceiverItemComponent.setupForm(this.formBuilder);
        if (sortingDirectionAscending) {
            this.groupArrayForm.push(itemGroup);
        } else {
            this.groupArrayForm.insert(0, itemGroup);
        }
        itemGroup.markAsDirty();
    }
}
