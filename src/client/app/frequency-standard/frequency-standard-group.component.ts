import {Component, Input} from '@angular/core';
import {MiscUtils} from '../shared/index';
import {AbstractGroup} from '../shared/abstract-groups-items/abstract-group';
import {FrequencyStandardViewModel} from './frequency-standard-view-model';

/**
 * This class represents a collection of FrequencyStandard Component.
 */
@Component({
  moduleId: module.id,
  selector: 'frequency-standard-group',
  templateUrl: 'frequency-standard-group.component.html',
})
export class FrequencyStandardGroupComponent extends AbstractGroup<FrequencyStandardViewModel> {
  public miscUtils: any = MiscUtils;
  @Input() frequencyStandards: any;

 @Input()
  set siteLogModel(siteLogModel: any) {
    this.setItemsCollection(siteLogModel.frequencyStandards);
  }

  @Input()
  set originalSiteLogModel(originalSiteLogModel: any) {
    this.setItemsOriginalCollection(originalSiteLogModel.frequencyStandards);
  }

  constructor() {
    super();
  }

  getItemName(): string {
    return 'Frequency Standard';
  }

  compare(obj1: FrequencyStandardViewModel, obj2: FrequencyStandardViewModel): number {
    if (obj1 === null || obj2 === null) {
      return 0;
    } else {
      let date1: string = obj1.startDate;
      let date2: string = obj2.endDate;
      return AbstractGroup.compareDates(date1, date2);
    }
  }

  newViewModelItem(): FrequencyStandardViewModel {
    return new FrequencyStandardViewModel();
  }
}
