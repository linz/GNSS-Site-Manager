import {Component, Input} from '@angular/core';
import { MiscUtilsService, JsonCheckService } from '../shared/index';

/**
 * This class represents the SelectSiteComponent for searching and selecting CORS sites.
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-water-vapor-sensor',
  templateUrl: 'water-vapor-sensor.component.html',
})
export class GnssWaterVaporSensorComponent {
  public errorMessage: string;
  @Input() status: any;
  @Input() waterVaporSensors: any;
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
   * Returns true if all previous GNSS waterVapor sensors are open, otherwise returns false
   */
  public arePrevWaterVaporSensorsOpen() {
    if(this.status.isWaterVaporSensorsOpen === null) {
      throw new Error('status.isWaterVaporSensorsOpen is null');
    }
    for (let i = 1; i < this.status.isWaterVaporSensorsOpen.length; i ++) {
      if (!this.status.isWaterVaporSensorsOpen[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns true if all previous GNSS waterVapor sensors are closed, otherwise returns false
   */
  public arePrevWaterVaporSensorsClosed() {
    if(this.status.isWaterVaporSensorsOpen === null) {
      throw new Error('status.isWaterVaporSensorsOpen is null');
    }
    for (let i = 1; i < this.status.isWaterVaporSensorsOpen.length; i ++) {
      if (this.status.isWaterVaporSensorsOpen[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Update the isOpen flags for all previous GNSS waterVapor sensors
   */
  public togglePrevWaterVaporSensors(flag: boolean) {
    if(this.status.isWaterVaporSensorsOpen === null) {
      throw new Error('status.isWaterVaporSensorsOpen is null');
    }
    for (let i = 1; i < this.status.isWaterVaporSensorsOpen.length; i ++) {
      this.status.isWaterVaporSensorsOpen[i] = flag;
    }
  }

  /**
   * Add a new empty waterVapor sensors as current one and push the 'old' current waterVapor sensors into previous list
   */
  public addNewWaterVaporSensor() {
    let presentDT = this.miscUtilsService.getPresentDateTime();

    if (!this.waterVaporSensors) {
      this.waterVaporSensors = [];
    }

    // Assign present date/time as default value to dateRemoved if it is empty
    if (this.waterVaporSensors.length > 0) {
      this.status.isWaterVaporSensorsOpen[0] = false;
      let currentWaterVaporSensor: any = this.waterVaporSensors[0];
      if (!currentWaterVaporSensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]
      || currentWaterVaporSensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0] === '') {
        currentWaterVaporSensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0] = presentDT;
      }
    }

    let newSensor = this.jsonCheckService.getNewWaterVaporSensor();

    // Clone from one of waterVapor sensor objects so that the "new" waterVapor sensor object can be saved
    let sensorObj: any = {};
    if ( this.siteLogModel.waterVaporSensors && this.siteLogModel.waterVaporSensors.length > 0 ) {
      sensorObj = this.miscUtilsService.cloneJsonObj(this.siteLogModel.waterVaporSensors[0]);
    }

    // Keep a copy of the waterVapor sensor object as the original one for comparison
    let sensorObjCopy: any = this.miscUtilsService.cloneJsonObj(sensorObj);
    sensorObjCopy.waterVaporSensor = this.miscUtilsService.cloneJsonObj(newSensor);
    if (!this.siteLogOrigin.waterVaporSensors) {
      this.siteLogOrigin.waterVaporSensors = [];
    }
    this.siteLogOrigin.waterVaporSensors.unshift(sensorObjCopy);

    newSensor.calibrationDate.value[0] = presentDT;
    newSensor.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0] = presentDT;
    sensorObj.waterVaporSensor = newSensor;
    if (!this.siteLogModel.waterVaporSensors) {
      this.siteLogModel.waterVaporSensors = [];
    }
    this.siteLogModel.waterVaporSensors.unshift(sensorObj);

    // Add the new waterVapor sensor as current one and open it by default
    this.waterVaporSensors.unshift(newSensor);
    this.status.isWaterVaporSensorsOpen.unshift(true);
    this.status.isWaterVaporSensorsGroupOpen = true;
    this.status.hasNewWaterVaporSensor = true;
  }

  /**
   * Remove the new current waterVapor sensor from the waterVapor sensor list and restore the old current waterVapor sensor
   */
  public removeNewWaterVaporSensors() {
    this.siteLogModel.waterVaporSensors.shift();
    this.siteLogOrigin.waterVaporSensors.shift();
    this.waterVaporSensors.shift();
    this.status.isWaterVaporSensorsOpen.shift();
    this.status.hasNewWaterVaporSensor = false;
    if (this.waterVaporSensors !== null && this.waterVaporSensors.length > 0) {
      this.status.isWaterVaporSensorsOpen[0] = true;
      this.waterVaporSensors[0].calibrationDate.value[0] = '';
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
