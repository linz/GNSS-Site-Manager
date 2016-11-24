import {Component, Input} from '@angular/core';
import { MiscUtilsService, JsonCheckService } from '../shared/index';

/**
 * This class represents the SelectSiteComponent for searching and selecting CORS sites.
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-pressure-sensor',
  templateUrl: 'pressure-sensor.component.html',
})
export class GnssPressureSensorComponent {
  public errorMessage: string;
  @Input() status: any;
  @Input() pressureSensors: any;
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
   * Returns true if all previous GNSS pressure sensors are open, otherwise returns false
   */
  public arePrevPressureSensorsOpen() {
    if(this.status.isPressureSensorsOpen === null) {
      throw new Error('status.isPressureSensorsOpen is null');
    }
    for (let i = 1; i < this.status.isPressureSensorsOpen.length; i ++) {
      if (!this.status.isPressureSensorsOpen[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns true if all previous GNSS pressure sensors are closed, otherwise returns false
   */
  public arePrevPressureSensorsClosed() {
    if(this.status.isPressureSensorsOpen === null) {
      throw new Error('status.isPressureSensorsOpen is null');
    }
    for (let i = 1; i < this.status.isPressureSensorsOpen.length; i ++) {
      if (this.status.isPressureSensorsOpen[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Update the isOpen flags for all previous GNSS pressure sensors
   */
  public togglePrevPressureSensors(flag: boolean) {
    if(this.status.isPressureSensorsOpen === null) {
      throw new Error('status.isPressureSensorsOpen is null');
    }
    for (let i = 1; i < this.status.isPressureSensorsOpen.length; i ++) {
      this.status.isPressureSensorsOpen[i] = flag;
    }
  }

  /**
   * Add a new empty pressure sensors as current one and push the 'old' current pressure sensors into previous list
   */
  public addNewPressureSensor() {
    let presentDT = this.miscUtilsService.getPresentDateTime();

    if (!this.pressureSensors) {
      this.pressureSensors = [];
    }

    // Assign present date/time as default value to dateRemoved if it is empty
    if (this.pressureSensors.length > 0) {
      this.status.isPressureSensorsOpen[0] = false;
      let currentPressureSensor: any = this.pressureSensors[0];
      if (!currentPressureSensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]
      || currentPressureSensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0] === '') {
        currentPressureSensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0] = presentDT;
      }
    }

    let newSensor = this.jsonCheckService.getNewPressureSensor();

    // Clone from one of pressure sensor objects so that the "new" pressure sensor object can be saved
    let sensorObj: any = {};
    if ( this.siteLogModel.pressureSensors && this.siteLogModel.pressureSensors.length > 0 ) {
      sensorObj = this.miscUtilsService.cloneJsonObj(this.siteLogModel.pressureSensors[0]);
    }

    // Keep a copy of the pressure sensor object as the original one for comparison
    let sensorObjCopy: any = this.miscUtilsService.cloneJsonObj(sensorObj);
    sensorObjCopy.pressureSensor = this.miscUtilsService.cloneJsonObj(newSensor);
    if (!this.siteLogOrigin.pressureSensors) {
      this.siteLogOrigin.pressureSensors = [];
    }
    this.siteLogOrigin.pressureSensors.unshift(sensorObjCopy);

    newSensor.calibrationDate.value[0] = presentDT;
    newSensor.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0] = presentDT;
    sensorObj.pressureSensor = newSensor;
    if (!this.siteLogModel.pressureSensors) {
      this.siteLogModel.pressureSensors = [];
    }
    this.siteLogModel.pressureSensors.unshift(sensorObj);

    // Add the new pressure sensor as current one and open it by default
    this.pressureSensors.unshift(newSensor);
    this.status.isPressureSensorsOpen.unshift(true);
    this.status.isPressureSensorsGroupOpen = true;
    this.status.hasNewPressureSensor = true;
  }

  /**
   * Remove the new current pressure sensor from the pressure sensor list and restore the old current pressure sensor
   */
  public removeNewPressureSensors() {
    this.siteLogModel.pressureSensors.shift();
    this.siteLogOrigin.pressureSensors.shift();
    this.pressureSensors.shift();
    this.status.isPressureSensorsOpen.shift();
    this.status.hasNewPressureSensor = false;
    if (this.pressureSensors !== null && this.pressureSensors.length > 0) {
      this.status.isPressureSensorsOpen[0] = true;
      this.pressureSensors[0].calibrationDate.value[0] = '';
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
