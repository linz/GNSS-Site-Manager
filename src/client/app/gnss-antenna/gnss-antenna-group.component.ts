import {Component, Input} from '@angular/core';
import {MiscUtils} from '../shared/index';
import {AbstractGroup} from '../shared/abstract-groups-items/abstract-group';
import {GnssAntennaViewModel} from './gnss-antenna-view-model';

/**
 * This class represents a collection of GNSS Antenna items.
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-antenna-group',
  templateUrl: 'gnss-antenna-group.component.html',
})
export class GnssAntennaGroupComponent extends AbstractGroup<GnssAntennaViewModel> {
  public miscUtils: any = MiscUtils;

  @Input()
  set siteLogModel(siteLogModel: any) {
    this.setItemsCollection(siteLogModel.gnssAntennas);
  }

  @Input()
  set originalSiteLogModel(originalSiteLogModel: any) {
    this.setItemsOriginalCollection(originalSiteLogModel.gnssAntennas);
  }

  constructor() {
    super();
  }

  getItemName(): string {
    return 'GNSS Antenna';
  }

  compare(obj1: GnssAntennaViewModel, obj2: GnssAntennaViewModel): number {
    if (obj1 === null || obj2 === null) {
      return 0;
    } else {
      let date1: string = obj1.dateInstalled;
      let date2: string = obj2.dateRemoved;
      return AbstractGroup.compareDates(date1, date2);
    }
  }

  newViewModelItem(): GnssAntennaViewModel {
    return new GnssAntennaViewModel();
  }
}
