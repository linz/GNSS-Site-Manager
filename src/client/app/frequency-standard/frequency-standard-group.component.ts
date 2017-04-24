import { Component, Input, OnInit } from '@angular/core';
import { AbstractGroup, sortingDirectionAscending } from '../shared/abstract-groups-items/abstract-group';
import { FrequencyStandardViewModel } from './frequency-standard-view-model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GnssReceiverItemComponent } from '../gnss-receiver/gnss-receiver-item.component';
import { FrequencyStandardItemComponent } from './frequency-standard-item.component';

/**
 * This class represents a collection of FrequencyStandard Component.
 */
@Component({
  moduleId: module.id,
  selector: 'frequency-standard-group',
  templateUrl: 'frequency-standard-group.component.html',
})
export class FrequencyStandardGroupComponent extends AbstractGroup<FrequencyStandardViewModel> implements OnInit {
    @Input() frequencyStandards: any;

  @Input()
  set siteLogModel(siteLogModel: any) {
    if (siteLogModel) {
        this.setItemsCollection(siteLogModel.frequencyStandards);
        this.setupForm('frequencyStandards');
    }
  }

  @Input()
  set originalSiteLogModel(originalSiteLogModel: any) {
    originalSiteLogModel && this.setItemsOriginalCollection(originalSiteLogModel.frequencyStandards);
  }

    static compare(obj1: FrequencyStandardViewModel, obj2: FrequencyStandardViewModel): number {
        let date1: string = obj1.startDate;
        let date2: string = obj2.startDate;
        return AbstractGroup.compareDates(date1, date2);
    }

    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    ngOnInit() {
        // This is happening too early before itemProperties are set in the @Input
        // this.setupForm();
    }

    getItemName(): string {
    return 'Frequency Standard';
  }

    compare(obj1: FrequencyStandardViewModel, obj2: FrequencyStandardViewModel): number {
        return FrequencyStandardGroupComponent.compare(obj1, obj2);
    }

  newItemViewModel(blank?: boolean): FrequencyStandardViewModel {
    return new FrequencyStandardViewModel(blank);
  }

    newItemFormInstance(): FormGroup {
        return FrequencyStandardItemComponent.newFormInstance(this.formBuilder);
    }
}
