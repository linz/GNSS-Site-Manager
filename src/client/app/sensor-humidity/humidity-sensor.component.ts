import {Component, OnInit, Input} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MiscUtilsService, ServiceWorkerService } from '../shared/index';

/**
 * This class represents the SelectSiteComponent for searching and selecting CORS sites.
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-humidity-sensor',
  templateUrl: 'humidity-sensor.component.html',
})
export class GnssHumiditySensorComponent implements OnInit {
  private serviceWorkerSubscription: Subscription;
  public errorMessage: string;
  private cacheItems: Array<string> = [];
  public hasNewReceiver: boolean = false;
  @Input() status: any;
  @Input() humiditySensors: any;
  @Input() siteLogModel: any;
  @Input() siteLogOrigin: any;

  constructor(private miscUtilsService: MiscUtilsService, private serviceWorkerService: ServiceWorkerService) { }

  /**
   * Initialize relevant variables when the directive is instantiated
   */
  ngOnInit() {
    this.setupSubscriptions();
  }

  setupSubscriptions() {
    this.serviceWorkerSubscription = this.serviceWorkerService.clearCacheObservable.subscribe((isCacheChanged: boolean) => {
      if (isCacheChanged) {
        this.updateCacheList();
      }
    });
  }

  /**
   * Component method to retrieve the list of URLs cached in the Service Worker and to update the this.cacheItem array
   */
  updateCacheList = (): void => {
    this.serviceWorkerService.getCacheList().then((data: string[]) => {
      this.cacheItems.length = 0;
      this.cacheItems = data;
    }).catch((error: any) => {
      console.error('Caught error in updateCacheList:', error);
    });
  };

  /**
   * Returns the date string (YYYY-MM-DD) from the date-time string (YYYY-MM-DDThh:mm:ssZ)
   */
  public getDate(datetime: string) {
    if ( datetime === null || typeof datetime === 'undefined') {
      return '';
    } else if (datetime.length < 10) {
      return datetime;
    }
    return datetime.substring(0, 10);
  }


  /**
   * Returns true if all previous GNSS receivers are open, otherwise returns false
   */
  public arePrevHumiditySensorsOpen() {
    if(this.status.isHumiditySensorsOpen === null) {
      throw new Error('status.isHumiditySensorsOpen is null');
    }
    for (let i = 1; i < this.status.isHumiditySensorsOpen.length; i ++) {
      if (!this.status.isHumiditySensorsOpen[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns true if all previous GNSS receivers are closed, otherwise returns false
   */
  public arePrevHumiditySensorsClosed() {
    if(this.status.isHumiditySensorsOpen === null) {
      throw new Error('status.isHumiditySensorsOpen is null');
    }
    for (let i = 1; i < this.status.isHumiditySensorsOpen.length; i ++) {
      if (this.status.isHumiditySensorsOpen[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Update the isOpen flags for all previous GNSS receivers,sko
   */
  public togglePrevHumiditySensors(flag: boolean) {
    if(this.status.isHumiditySensorsOpen === null) {
      throw new Error('status.isHumiditySensorsOpen is null');
    }
    for (let i = 1; i < this.status.isHumiditySensorsOpen.length; i ++) {
      this.status.isHumiditySensorsOpen[i] = flag;
    }
  }

  /**
   * Add a new empty receiver as current one and push the 'old' current receiver into previous list
   */
  public addNewhumiditySensor() {
    let presentDT = this.miscUtilsService.getPresentDateTime();

    if (!this.humiditySensors) {
      this.humiditySensors = [];
    }
    // TODO - EffectiveDate is listed as a displayed field in https://igscb.jpl.nasa.gov/igscb/station/general/blank.log
    // But isn't available in GeodesyML.
    let newSensor = {
      // Defined in equipment.xsd - humiditySensorType
      dataSamplingInterval: 0,
      accuracyPercentRelativeHumidity: 0,
      aspiration: '',
      notes: '',
      // Defined in equipment.xsd - baseSensorEquipmentType
      manufacturer: '',
      serialNumber: '',
      heightDiffToAntenna: 0,
      calibrationDate: {
        value: ['']
      }
    };
    // // Clone from one of GNSS Receiver objects so that the "new" receiver object can be saved
    let sensorObj: any = {};
    if ( this.siteLogModel.humiditySensors && this.siteLogModel.humiditySensors.length > 0 ) {
      sensorObj = this.miscUtilsService.cloneJsonObj(this.siteLogModel.humiditySensors[0]);
    }

    // Keep a copy of the receiver object as the original one for comparison
    let sensorObjCopy: any = this.miscUtilsService.cloneJsonObj(sensorObj);
    sensorObjCopy.humiditySensor = this.miscUtilsService.cloneJsonObj(newSensor);
    this.siteLogOrigin.humiditySensors.unshift(sensorObjCopy);

    newSensor.calibrationDate.value[0] = presentDT;
    sensorObj.humiditySensor = newSensor;
    this.siteLogModel.humiditySensors.unshift(sensorObj);

    // Add the new receiver as current one and open it by default
    this.humiditySensors.unshift(newSensor);
    this.status.isHumiditySensorsOpen.unshift(true);
    this.status.isHumiditySensorsGroupOpen = true;
    this.status.hasNewHumiditySensor = true;
  }

  /**
   * Remove the new current receiver from the receiver list and restore the old current receiver
   */
  public removeNewHumiditySensors() {
    this.siteLogModel.humiditySensors.shift();
    this.siteLogOrigin.humiditySensors.shift();
    this.humiditySensors.shift();
    this.status.isHumiditySensorsOpen.shift();
    this.status.hasNewHumiditySensor = false;
    if (this.humiditySensors !== null && this.humiditySensors.length > 0) {
      this.status.isHumiditySensorsOpen[0] = true;
      this.humiditySensors[0].calibrationDate.value[0] = '';
    }
  }

  /**
   * Date is 'dateTtime where time includes '.000z'.  Don't need the 'T', the milliseconds or the time zone (UTC default)
   *
   * @param dateString
   */
  public formatDateString(dateString: string): string {
    let d1: string = dateString.replace('T', ' ');
    let d2: string = d1.replace(/\..+/,'');
    return d2;
  }
}
