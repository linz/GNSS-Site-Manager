import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MiscUtilsService } from '../shared/index';
import { SensorItemBase } from './SensorItemBase';
import { GeodesyEvent } from './Event';
/**
 * This class represents the SelectSiteComponent for searching and selecting CORS sites.
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-humidity-sensor-item',
  templateUrl: 'humidity-sensor-item.component.html',
})
export class HumiditySensorItemComponent extends SensorItemBase {
  constructor(private miscUtilsService: MiscUtilsService) {
    super();
  }

  /**
   * Total number of humiditySensors
   */
  @Input() total: number;
  /**
   * The index of this sensor (zero-based)
   */
  @Input() index: number;
  /**
   * The HumiditySensor in question.
   */
  humiditySensor: any;

  @Input()
  set theHumiditySensor(passedhumiditySensor: any) {
    // Done this way to give use the option of extracting the other fields -
    // dateInserted and Deleted and deletedReason
    this.humiditySensor = passedhumiditySensor.humiditySensor;
    console.log('humiditySensor: ', this.humiditySensor);
  }

  /**
   * This is to receive geodesyEvent from parent.
   */
  @Input() geodesyEvent: GeodesyEvent;

  /**
   * Events children components can send to their parent components.  Usually these are then passed to all
   * child components.
   * @type {EventEmitter<boolean>}
   */
  @Output() returnEvents = new EventEmitter<GeodesyEvent>();

  getGeodesyEvent(): GeodesyEvent {
    return this.geodesyEvent;
  }

  getIndex(): number {
    return this.index;
  }

  getReturnEvents(): EventEmitter<GeodesyEvent> {
    return this.returnEvents;
  }

}
