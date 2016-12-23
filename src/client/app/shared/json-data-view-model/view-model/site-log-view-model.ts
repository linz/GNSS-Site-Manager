import {HumiditySensorViewModel} from '../../../humidity-sensor/humidity-sensor-view-model';

/**
 * View Model equivalent of ../data-model/SiteLogDataModel
 */
export class SiteLogViewModel {
  siteLog: ViewSiteLog;
}

export class ViewSiteLog {
  siteIdentification: any;
  siteLocation: any;
  gnssReceivers: any[];
  gnssAntennas: any[];
  surveyedLocalTies: any[];
  frequencyStandards: any[];
  humiditySensors: HumiditySensorViewModel[];
  pressureSensors: any[];
  temperatureSensors: any[];
  waterVaporSensors: any[];
  siteOwner: any[];
  siteContact: any[];
  siteMetadataCustodian: any;
  siteDataSource: any;
  moreInformation: any;
  dataStreamsSet: any;
}
