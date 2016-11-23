import {Component, Input} from '@angular/core';
import {MiscUtilsService} from '../shared/index';
import {SensorsGroupBase} from './SensorsGroupBase';
import {GeodesyEvent, EventNames} from './Event';
import {
  HumiditySensor,
  AbstractTimePrimitive,
  ValidTime,
  TimePeriod,
  BeginPosition,
  EndPosition,
  HumiditySensorContainer,
  ValidTime2
} from './HumiditySensor';

/**
 * This class represents the SelectSiteComponent for searching and selecting CORS sites.
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-humidity-sensors-group',
  templateUrl: 'humidity-sensors-group.component.html',
})
export class HumiditySensorsGroupComponent extends SensorsGroupBase {
  private humiditySensors: HumiditySensor[];
  private humiditySensorsOriginal: HumiditySensor[];

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

  constructor(private miscUtilsService: MiscUtilsService) {
    super();
  }

  getItemsCollection(): any {
    return this.humiditySensors;
  }

  setItemsCollection(passedHumiditySensors: HumiditySensor[]) {
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

    // Send event to close and open the previous item to prevent problem where the updated ... maybe try timeout instead ...
  }

  /* **************************************************
   * Other methods
   */

  /**
   * Use this on existing humitySensors to populate missing fields or on new to fully define it.
   *
   * @param hs - humiditySensor
   */
  private makeExist(hs: HumiditySensor) {
    if (!hs.validTime) {
      let validTime: ValidTime = <ValidTime>{};
      hs.validTime = validTime;
    }
    if (!hs.validTime.abstractTimePrimitive) {
      let abstractTimePrimitive: AbstractTimePrimitive = <AbstractTimePrimitive>{};
      hs.validTime.abstractTimePrimitive = abstractTimePrimitive;
    }
    if (!hs.validTime.abstractTimePrimitive['gml:TimePeriod']) {
      let timePeriod: TimePeriod = <TimePeriod>{};
      hs.validTime.abstractTimePrimitive['gml:TimePeriod'] = timePeriod;
    }
    if (!hs.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition) {
      let beginPosition: BeginPosition = <BeginPosition>{};
      hs.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition = beginPosition;
    }
    if (!hs.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value
      || hs.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value.length === 0) {
      hs.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value = [''];
    }
    if (!hs.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition) {
      let endPosition: EndPosition = <EndPosition>{};
      hs.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition = endPosition;
    }
    if (!hs.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value
      || hs.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value.length === 0) {
      hs.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value = [''];
    }

    // Defined in equipment.xsd - hsType
    if (!hs.dataSamplingInterval) {
      hs.dataSamplingInterval = 0;
    }
    if (!hs.accuracyPercentRelativeHumidity) {
      hs.accuracyPercentRelativeHumidity = 0;
    }
    if (!hs.aspiration) {
      hs.aspiration = '';
    }
    if (!hs.notes) {
      hs.notes = '';
    }
    // Defined in equipment.xsd - baseSensorEquipmentType
    if (!hs.manufacturer) {
      hs.manufacturer = '';
    }
    if (!hs.serialNumber) {
      hs.serialNumber = '';
    }
    if (!hs.heightDiffToAntenna) {
      hs.heightDiffToAntenna = 0;
    }
    if (!hs.calibrationDate) {
      let validTime2: ValidTime2 = <ValidTime2>{};
      hs.calibrationDate = validTime2;
    }
    if (!hs.calibrationDate.value || hs.calibrationDate.value.length === 0) {
      hs.calibrationDate.value = [''];
    }
  }

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

  private makeContainerExist(c: HumiditySensorContainer) {
    if (!c.TYPE_NAME) {
      c.TYPE_NAME = 'GEODESYML_0.3.HumiditySensorPropertyType';
    }
    if (!c.dateDeleted) {
      let validTime2_1: ValidTime2 = <ValidTime2>{};
      c.dateDeleted = validTime2_1;
    }
    if (!c.dateDeleted.TYPE_NAME) {
      c.dateDeleted.TYPE_NAME = 'GML_3_2_1.TimePositionType';
    }
    if (!c.dateDeleted.value) {
      c.dateDeleted.value = [''];
    }
    if (!c.dateInserted) {
      let validTime2_2: ValidTime2 = <ValidTime2>{};
      c.dateInserted = validTime2_2;
    }
    if (!c.dateInserted.TYPE_NAME) {
      c.dateInserted.TYPE_NAME = 'GML_3_2_1.TimePositionType';
    }
    if (!c.dateInserted.value) {
      c.dateInserted.value = [''];
    }
    if (!c.deletedReason) {
      c.deletedReason = '';
    }
    if (!c.humiditySensor) {
      let humiditySensor: HumiditySensor = <HumiditySensor>{};
      c.humiditySensor = humiditySensor;
    }
  }

  private newSensor(): any {
    let newSensor: HumiditySensor = <HumiditySensor>{};
    this.makeExist(newSensor);
    return newSensor;
  }

  private newSensorContainer(theHumiditySensor: HumiditySensor): HumiditySensorContainer {
    let newSensorContainer: HumiditySensorContainer = <HumiditySensorContainer>{};
    this.makeContainerExist(newSensorContainer);

    newSensorContainer.humiditySensor = theHumiditySensor;
    return newSensorContainer;
  }

  /**
   * Add a new empty humidity sensors as current one and push the 'old' current humidity sensors into previous list
   */
  public addNew(): void {
    let presentDT = this.miscUtilsService.getPresentDateTime();

    if (!this.getItemsCollection()) {
      this.setItemsCollection([]);
    }

    // Assign present date/time as default value to dateRemoved if it is empty
    if (this.getItemsCollection().length > 0) {
      let currentHumiditySensor: HumiditySensor = this.getItemsCollection()[0].humiditySensor;
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
