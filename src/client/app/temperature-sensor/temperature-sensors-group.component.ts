import { Component, Input } from '@angular/core';
import { MiscUtils } from '../shared/index';
import { AbstractGroup } from '../shared/abstract-groups-items/abstract-group';
import { TemperatureSensorViewModel } from './temperature-sensor-view-model';

/**
 * This class represents a group of Temperature Sensors.
 */
@Component({
  moduleId: module.id,
  selector: 'temperature-sensors-group',
  templateUrl: 'temperature-sensors-group.component.html',
})
export class TemperatureSensorsGroupComponent extends AbstractGroup<TemperatureSensorViewModel> {
  public miscUtils: any = MiscUtils;

  @Input()
  set siteLogModel(siteLogModel: any) {
    this.setItemsCollection(siteLogModel.temperatureSensors);
    console.log('TemperatureSensors: ', this.getItemsCollection());
  }

  @Input()
  set originalSiteLogModel(originalSiteLogModel: any) {
    this.setItemsOriginalCollection(originalSiteLogModel.temperatureSensors);
    console.log('TemperatureSensors (Original): ', this.getItemsOriginalCollection());
  }

  constructor() {
    super();
  }

  getItemName(): string {
    return 'Temperature Sensor';
  }

  compare(obj1: TemperatureSensorViewModel, obj2: TemperatureSensorViewModel): number {
    let date1: string = obj1.startDate;
    let date2: string = obj2.startDate;
    return AbstractGroup.compareDates(date1, date2);
  }

  newViewModelItem(): TemperatureSensorViewModel {
    return new TemperatureSensorViewModel();
  }
}
