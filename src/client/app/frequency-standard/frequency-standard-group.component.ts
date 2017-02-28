import { Component, Input, OnInit } from '@angular/core';
import { AbstractGroup } from '../shared/abstract-groups-items/abstract-group';
import { FrequencyStandardViewModel } from './frequency-standard-view-model';
import { FormArray, FormBuilder } from '@angular/forms';

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
    siteLogModel && this.setItemsCollection(siteLogModel.frequencyStandards);
  }

  @Input()
  set originalSiteLogModel(originalSiteLogModel: any) {
    originalSiteLogModel && this.setItemsOriginalCollection(originalSiteLogModel.frequencyStandards);
  }

    ngOnInit() {
        this.setupForm();
    }

    private setupForm() {
        this.groupArrayForm =  new FormArray([]);
        this.siteInfoForm.addControl('frequencyStandards', this.groupArrayForm);
    }

    getItemName(): string {
    return 'Frequency Standard';
  }

  compare(obj1: FrequencyStandardViewModel, obj2: FrequencyStandardViewModel): number {
    let date1: string = obj1.startDate;
    let date2: string = obj2.startDate;
    return AbstractGroup.compareDates(date1, date2);
  }

  newViewModelItem(): FrequencyStandardViewModel {
    return new FrequencyStandardViewModel();
  }
}
