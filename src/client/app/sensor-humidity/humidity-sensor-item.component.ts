import {Component, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {MiscUtilsService} from '../shared/index';
import {AbstractItem} from '../shared/abstract-groups-items/AbstractItem';
import {GeodesyEvent} from './Event';
import {HumiditySensor} from './HumiditySensor';
/**
 * This class represents the SelectSiteComponent for searching and selecting CORS sites.
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-humidity-sensor-item',
  templateUrl: 'humidity-sensor-item.component.html',
})
export class HumiditySensorItemComponent extends AbstractItem {
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
  protected humiditySensor: HumiditySensor;

  @Input()
  set humiditySensorWrapper(humiditySensorWrapper: any) {
    // Done this way to give use the option of extracting the other fields -
    // dateInserted and Deleted and deletedReason from the HS wrapper
    this.humiditySensor = humiditySensorWrapper.humiditySensor;
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

  constructor(private ref: ChangeDetectorRef, private miscUtilsService: MiscUtilsService) {
    super();
  }

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
