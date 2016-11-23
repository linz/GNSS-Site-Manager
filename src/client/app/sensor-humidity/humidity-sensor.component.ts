import {Component, Input} from '@angular/core';
import { MiscUtilsService, JsonCheckService } from '../shared/index';

/**
 * This class represents the SelectSiteComponent for searching and selecting CORS sites.
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-humidity-sensor',
  templateUrl: 'humidity-sensor.component.html',
})
export class GnssHumiditySensorComponent {
  public errorMessage: string;
  @Input() status: any;
  @Input() humiditySensors: any;
  @Input() siteLogModel: any;
  @Input() siteLogOrigin: any;

  constructor(private miscUtilsService: MiscUtilsService,
              private jsonCheckService: JsonCheckService) { }

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
   * Returns true if all previous GNSS humidity sensors are open, otherwise returns false
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
   * Returns true if all previous GNSS humidity sensors are closed, otherwise returns false
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
   * Update the isOpen flags for all previous GNSS humidity sensors
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
   * Add a new empty humidity sensors as current one and push the 'old' current humidity sensors into previous list
   */
  public addNewHumiditySensor() {
    let presentDT = this.miscUtilsService.getPresentDateTime();

    if (!this.humiditySensors) {
      this.humiditySensors = [];
    }

    // Assign present date/time as default value to dateRemoved if it is empty
    if (this.humiditySensors.length > 0) {
      this.status.isHumiditySensorsOpen[0] = false;
      let currentHumiditySensor: any = this.humiditySensors[0];
      if (!currentHumiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]
      || currentHumiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0] === '') {
        currentHumiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0] = presentDT;
      }
    }

    let newSensor = this.jsonCheckService.getNewHumiditySensor();

    // Clone from one of humidity sensor objects so that the "new" humidity sensor object can be saved
    let sensorObj: any = {};
    if ( this.siteLogModel.humiditySensors && this.siteLogModel.humiditySensors.length > 0 ) {
      sensorObj = this.miscUtilsService.cloneJsonObj(this.siteLogModel.humiditySensors[0]);
    }

    // Keep a copy of the humidity sensor object as the original one for comparison
    let sensorObjCopy: any = this.miscUtilsService.cloneJsonObj(sensorObj);
    sensorObjCopy.humiditySensor = this.miscUtilsService.cloneJsonObj(newSensor);
    if (!this.siteLogOrigin.humiditySensors) {
      this.siteLogOrigin.humiditySensors = [];
    }
    this.siteLogOrigin.humiditySensors.unshift(sensorObjCopy);

    newSensor.calibrationDate.value[0] = presentDT;
    newSensor.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0] = presentDT;
    sensorObj.humiditySensor = newSensor;
    if (!this.siteLogModel.humiditySensors) {
      this.siteLogModel.humiditySensors = [];
    }
    this.siteLogModel.humiditySensors.unshift(sensorObj);

    // Add the new humidity sensor as current one and open it by default
    this.humiditySensors.unshift(newSensor);
    this.status.isHumiditySensorsOpen.unshift(true);
    this.status.isHumiditySensorsGroupOpen = true;
    this.status.hasNewHumiditySensor = true;
  }

  /**
   * Remove the new current humidity sensor from the humidity sensor list and restore the old current humidity sensor
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
   * Date is a dateTime where time includes '.000z'.  This strips the 'T', the milliseconds and the time zone (UTC default)
   *
   * @param dateString
   */
  public formatDateString(dateString: string): string {
    let d1: string = dateString.replace('T', ' ');
    let d2: string = d1.replace(/\..+/,'');
    return d2;
  }
}
