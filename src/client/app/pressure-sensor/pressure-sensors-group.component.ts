import {Component, Input} from '@angular/core';
import {MiscUtils} from '../shared/index';
import {AbstractGroup} from '../shared/abstract-groups-items/abstract-group';
import {PressureSensorViewModel} from './pressure-sensor-view-model';

/**
 * This class represents a group of Pressure Sensors.
 */
@Component({
  moduleId: module.id,
  selector: 'pressure-sensors-group',
  templateUrl: 'pressure-sensors-group.component.html',
})
export class PressureSensorsGroupComponent extends AbstractGroup<PressureSensorViewModel> {
  public miscUtils: any = MiscUtils;

  @Input()
  set siteLogModel(siteLogModel: any) {
    this.setItemsCollection(siteLogModel.pressureSensors);
    console.log('PressureSensors: ', this.getItemsCollection());
  }

  @Input()
  set originalSiteLogModel(originalSiteLogModel: any) {
    this.setItemsOriginalCollection(originalSiteLogModel.pressureSensors);
    console.log('PressureSensors (Original): ', this.getItemsOriginalCollection());
  }

  constructor() {
    super();
  }

  getItemName(): string {
    return 'Pressure Sensor';
  }

  compare(obj1: PressureSensorViewModel, obj2: PressureSensorViewModel): number {
    let date1: string = obj1.startDate;
    let date2: string = obj2.startDate;
    return AbstractGroup.compareDates(date1, date2);
  }

  newViewModelItem(): PressureSensorViewModel {
    return new PressureSensorViewModel();
  }
}
