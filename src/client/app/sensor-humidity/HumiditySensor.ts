export interface BeginPosition {
  value: string[];
}

export interface EndPosition {
  value: string[];
}

export interface TimePeriod {
  beginPosition: BeginPosition;
  endPosition: EndPosition;
}

export interface AbstractTimePrimitive {
  'gml:TimePeriod': TimePeriod;
}

export interface ValidTime {
  abstractTimePrimitive: AbstractTimePrimitive;
}

export interface ValidTime2 {
  TYPE_NAME: string;
  value: string[];
}


export interface HumiditySensor {
  validTime: ValidTime;
  dataSamplingInterval: number;
  accuracyPercentRelativeHumidity: number;
  aspiration: string;
  notes: string;
  manufacturer: string;
  serialNumber: string;
  heightDiffToAntenna: number;
  calibrationDate: ValidTime2;
}

export interface HumiditySensorContainer {
  TYPE_NAME: string;
  dateDeleted: ValidTime2;
  dateInserted: ValidTime2;
  deletedReason: string;
  humiditySensor: HumiditySensor;
}

// (c.TYPE_NAME) || (c.TYPE_NAME = 'GEODESYML_0.3.HumiditySensorPropertyType');
// (c.dateDeleted) || (c.dateDeleted = {});
// (c.dateDeleted.TYPE_NAME) || (c.dateDeleted.TYPE_NAME = 'GML_3_2_1.TimePositionType');
// (c.dateDeleted.value) || (c.dateDeleted.value = []);
// (c.dateInserted) || (c.dateInserted = {});
// (c.dateInserted.TYPE_NAME) || (c.dateInserted.TYPE_NAME = 'GML_3_2_1.TimePositionType');
// (c.dateInserted.value) || (c.dateInserted.value = []);
// (c.deletedReason) || (c.deletedReason = '');
// (c.humiditySensor) || (c.humiditySensor = {});


//   validTime = {});
// validTime.abstractTimePrimitive) || validTime.abstractTimePrimitive = {});
// validTime.abstractTimePrimitive['gml:TimePeriod'])
// || validTime.abstractTimePrimitive['gml:TimePeriod'] = {});
//
// validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition)
// || validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition = {});
// validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value)
// || validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value = []);
//
// validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition)
// || validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition = {});
// validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value) ||
// validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value = []);
//
//
// // Defined in equipment.xsd - hsType
// dataSamplingInterval) || dataSamplingInterval = 0);
// accuracyPercentRelativeHumidity) || accuracyPercentRelativeHumidity = 0);
// aspiration) || aspiration = '');
// notes) || notes = '');
// // Defined in equipment.xsd - baseSensorEquipmentType
// manufacturer) || manufacturer = '');
// serialNumber) || serialNumber = '');
// heightDiffToAntenna) || heightDiffToAntenna = 0);
// calibrationDate) || calibrationDate = {});
// calibrationDate.value) || calibrationDate.value = ['']);
