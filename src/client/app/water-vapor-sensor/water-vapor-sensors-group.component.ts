import {Component, Input} from '@angular/core';
import {MiscUtils} from '../shared/index';
import {AbstractGroup} from '../shared/abstract-groups-items/abstract-group';
import {WaterVaporSensorViewModel} from './water-vapor-sensor-view-model';

/**
 * This class represents a group of WaterVapor Sensors.
 */
@Component({
  moduleId: module.id,
  selector: 'water-vapor-sensors-group',
  templateUrl: 'water-vapor-sensors-group.component.html',
})
export class WaterVaporSensorsGroupComponent extends AbstractGroup<WaterVaporSensorViewModel> {
  public miscUtils: any = MiscUtils;

  @Input()
  set siteLogModel(siteLogModel: any) {
    this.setItemsCollection(siteLogModel.waterVaporSensors);
    console.log('WaterVaporSensors: ', this.getItemsCollection());
  }

  @Input()
  set originalSiteLogModel(originalSiteLogModel: any) {
    this.setItemsOriginalCollection(originalSiteLogModel.waterVaporSensors);
    console.log('WaterVaporSensors (Original): ', this.getItemsOriginalCollection());
  }

  constructor() {
    super();
  }

  getItemName(): string {
    return 'WaterVapor Sensor';
  }

  compare(obj1: WaterVaporSensorViewModel, obj2: WaterVaporSensorViewModel): number {
    let date1: string = obj1.startDate;
    let date2: string = obj2.startDate;
    return AbstractGroup.compareDates(date1, date2);
  }

  newViewModelItem(): WaterVaporSensorViewModel {
    return new WaterVaporSensorViewModel();
  }
}
