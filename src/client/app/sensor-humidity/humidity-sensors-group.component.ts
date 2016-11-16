import { Component, Input } from '@angular/core';
import { MiscUtilsService } from '../shared/index';
import { SensorsGroupBase } from './SensorsGroupBase';
import { GeodesyEvent, EventNames } from './Event';

/**
 * This class represents the SelectSiteComponent for searching and selecting CORS sites.
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-humidity-sensors-group',
  templateUrl: 'humidity-sensors-group.component.html',
})
export class HumiditySensorsGroupComponent extends SensorsGroupBase {
  constructor(private miscUtilsService: MiscUtilsService) {
    super();
  }

  private humiditySensors: any;
  private humiditySensorsOriginal: any;

  /**
   * Event mechanism to communicate with children.  Simply change the value of this.
   * @type {{name: EventNames}}
   */
  private geodesyEvent: GeodesyEvent = {name: EventNames.none};

  @Input()
  set siteLogModel(passedSiteLogModel: any) {
    this.humiditySensors = passedSiteLogModel.humiditySensors;
    this.populateDefaultExistingItems(this.humiditySensors);
    console.log('humiditySensors: ', this.humiditySensors);
  }

  @Input()
  set originalSiteLogModel(passedOriginalSiteLogModel: any) {
    this.humiditySensorsOriginal = passedOriginalSiteLogModel.humiditySensors;
    this.populateDefaultExistingItems(this.humiditySensorsOriginal);
    console.log('humiditySensorsOriginal: ', this.humiditySensorsOriginal);
  }

  getItemsCollection(): any {
    return this.humiditySensors;
  }

  setItemsCollection(passedHumiditySensors: any) {
    this.humiditySensors = passedHumiditySensors;
  }

  getItemsOriginalCollection(): any {
    return this.humiditySensorsOriginal;
  }

  getGeodesyEvent(): GeodesyEvent {
    return this.geodesyEvent;
  }

  /**
   * After a new sensor is created, send this so it can init itself.
   */
  newSensorEvent() {
    console.log('parent newSensorEvent');
    let geodesyEvent: GeodesyEvent = this.getGeodesyEvent();
    geodesyEvent.name = EventNames.newSensor;
    geodesyEvent.valueNumber = 0;
  }

  /* **************************************************
   * Other methods
   */

  /**
   * Make sure the loaded Humidity Sensors have all values including any default ones.
   *
   * @param humiditySensors
   */
  private populateDefaultExistingItems(humiditySensors: any) {
    if (humiditySensors) {
      for (let humiditySensorContainer of humiditySensors) {
        this.makeExist(humiditySensorContainer['humiditySensor']);
      }
    }
  }

  /**
   * Use this on existing humitySensors to populate missing fields or on new to fully define it.
   *
   * @param hs - humiditySensor
   */
  private makeExist(hs: any) {
    (hs.validTime) || (hs.validTime = {});
    (hs.validTime.abstractTimePrimitive) || (hs.validTime.abstractTimePrimitive = {});
    (hs.validTime.abstractTimePrimitive['gml:TimePeriod'])
    || (hs.validTime.abstractTimePrimitive['gml:TimePeriod'] = {});

    (hs.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition)
    || (hs.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition = {});
    ((hs.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value)
    && (hs.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value.length > 0))
    || (hs.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value = ['']);

    (hs.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition)
    || (hs.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition = {});
    ((hs.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value)
    && (hs.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value.length > 0))
    || (hs.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value = ['']);

    // Defined in equipment.xsd - hsType
    (hs.dataSamplingInterval) || (hs.dataSamplingInterval = 0);
    (hs.accuracyPercentRelativeHumidity) || (hs.accuracyPercentRelativeHumidity = 0);
    (hs.aspiration) || (hs.aspiration = '');
    (hs.notes) || (hs.notes = '');
    // Defined in equipment.xsd - baseSensorEquipmentType
    (hs.manufacturer) || (hs.manufacturer = '');
    (hs.serialNumber) || (hs.serialNumber = '');
    (hs.heightDiffToAntenna) || (hs.heightDiffToAntenna = 0);
    (hs.calibrationDate) || (hs.calibrationDate = {});
    ((hs.calibrationDate.value) && (hs.calibrationDate.value.length > 0)) || (hs.calibrationDate.value = ['']);
  }

  private makeContainerExist(c: any) {
    (c.TYPE_NAME) || (c.TYPE_NAME = 'GEODESYML_0.3.HumiditySensorPropertyType');
    (c.dateDeleted) || (c.dateDeleted = {});
    (c.dateDeleted.TYPE_NAME) || (c.dateDeleted.TYPE_NAME = 'GML_3_2_1.TimePositionType');
    (c.dateDeleted.value) || (c.dateDeleted.value = []);
    (c.dateInserted) || (c.dateInserted = {});
    (c.dateInserted.TYPE_NAME) || (c.dateInserted.TYPE_NAME = 'GML_3_2_1.TimePositionType');
    (c.dateInserted.value) || (c.dateInserted.value = []);
    (c.deletedReason) || (c.deletedReason = '');
    (c.humiditySensor) || (c.humiditySensor = {});
  }

  private newSensor(): any {
    let newSensor: any = {};
    this.makeExist(newSensor);
    return newSensor;
  }

  private newSensorContainer(theHumiditySensor: any): any {
    let newSensorContainer = {};
    this.makeContainerExist(newSensorContainer);
    newSensorContainer['humiditySensor'] = theHumiditySensor;
    return newSensorContainer;
  }

  /**
   * Add a new empty humidity sensors as current one and push the 'old' current humidity sensors into previous list
   */
  public addNew() {
    let presentDT = this.miscUtilsService.getPresentDateTime();

    if (!this.getItemsCollection()) {
      this.setItemsCollection([]);
    }

    // Assign present date/time as default value to dateRemoved if it is empty
    if (this.getItemsCollection().length > 0) {
      let currentHumiditySensor: any = this.getItemsCollection()[0].humiditySensor;
      this.makeExist(currentHumiditySensor);
      if (!currentHumiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]
        || currentHumiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0] === '') {
        currentHumiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0] = presentDT;
        console.log('Update last current sensor - set endPosition: ',
          currentHumiditySensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0]);
      }
      console.log('Update last current sensor: ', currentHumiditySensor);
    }

    let newSensor = this.newSensor();
    let newSensorContainer = this.newSensorContainer(newSensor);
    let newSensorContainerCopy = this.miscUtilsService.cloneJsonObj(newSensorContainer);

    newSensor.calibrationDate.value[0] = presentDT;
    newSensor.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0] = presentDT;

    // Add the new humidity sensor as current one and open it by default
    this.getItemsCollection().unshift(newSensorContainer);
    // Add the new humidity sensor (copy) into the original list so a diff of the fields can be performed
    this.getItemsOriginalCollection().unshift(newSensorContainerCopy);

    this.newSensorEvent();
  }
}
