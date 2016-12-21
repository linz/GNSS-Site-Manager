import {Component, Input} from '@angular/core';
import {MiscUtilsService} from '../shared/index';
import {AbstractGroup} from '../shared/abstract-groups-items/AbstractGroup';
import {
  HumiditySensor,
  AbstractTimePrimitive,
  ValidTime,
  TimePeriod,
  BeginPosition,
  EndPosition,
  HumiditySensorProperty,
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
export class HumiditySensorsGroupComponent extends AbstractGroup {
  public miscUtilsService: any = MiscUtilsService;
  @Input()
  set siteLogModel(siteLogModel: any) {
    this.setItemsCollection(siteLogModel.humiditySensors);
    console.log('HumiditySensors: ', this.getItemsCollection());
  }

  @Input()
  set originalSiteLogModel(originalSiteLogModel: any) {
    this.setItemsOriginalCollection(originalSiteLogModel.humiditySensors);
    console.log('HumiditySensors (Original): ', this.getItemsOriginalCollection());
  }

  constructor() {
    super();
  }

  getWhatIsTheItemName(): string {
    return 'Humidity Sensor';
  }

  getComparator(obj1: HumiditySensorProperty, obj2: HumiditySensorProperty): number {
    if (obj1 === null || obj2 === null) {
      return 0;
    } else if (obj1.humiditySensor === null || obj1.humiditySensor === null) {
      return 0;
    } else {
      let date1: string = AbstractGroup.getBeginPositionDate(obj1.humiditySensor);
      let date2: string = AbstractGroup.getBeginPositionDate(obj2.humiditySensor);
      return AbstractGroup.compareDates(date1, date2);
    }
  }

   /* **************************************************
   * Other methods
   */

  /**
   * Use this on existing humitySensors to populate missing fields or on new to fully define it.
   *
   * @param hs - humiditySensor
   */
  makeItemExist(hs: HumiditySensor) {
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

  makeItemsPropertyExist(c: HumiditySensorProperty) {
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

  private newSensor(): HumiditySensor {
    let newSensor: HumiditySensor = <HumiditySensor>{};
    this.makeItemExist(newSensor);
    return newSensor;
  }

  private newSensorProperty(theHumiditySensor: HumiditySensor): HumiditySensorProperty {
    let newSensorContainer: HumiditySensorProperty = <HumiditySensorProperty>{};
    this.makeItemsPropertyExist(newSensorContainer);

    newSensorContainer.humiditySensor = theHumiditySensor;
    return newSensorContainer;
  }


  /**
   * Add a new empty humidity sensors as current one and push the 'old' current humidity sensors into previous list
   */
  public addNewItem(): void {
    this.isGroupOpen = true;
    let presentDT = MiscUtilsService.getPresentDateTime();

    if (!this.getItemsCollection()) {
      this.setItemsCollection([]);
    }

    // Assign present date/time as default value to dateRemoved if it is empty
    if (this.getItemsCollection().length > 0) {
      let currentSensor: HumiditySensor = this.getItemsCollection()[0].humiditySensor;
      this.makeItemExist(currentSensor);
      if (! AbstractGroup.getEndPositionDate(currentSensor) || AbstractGroup.getEndPositionDate(currentSensor) === '') {
        currentSensor.validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0] = presentDT;
        // console.log('Update last current sensor - set endPosition: ',this.getBeginPositionDate(currentSensor));
      }
      console.log('Update last current sensor: ', currentSensor);
    }

    let newSensor = this.newSensor();
    let newSensorProperty = this.newSensorProperty(newSensor);
    let newSensorPropertyCopy = MiscUtilsService.cloneJsonObj(newSensorProperty);

    newSensor.calibrationDate.value[0] = presentDT;
    newSensor.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0] = presentDT;

    console.log('New sensor: ', newSensorProperty);

    // Add the new humidity sensor as current one
    this.getItemsCollection().unshift(newSensorProperty);
    // Add the new humidity sensor (copy) into the original list so a diff of the fields can be performed
    this.getItemsOriginalCollection().unshift(newSensorPropertyCopy);

    this.newItemEvent();
  }
}
