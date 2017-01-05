import {GnssAntennaViewModel} from '../../../gnss-antenna/gnss-antenna-view-model';
import {HumiditySensorViewModel} from '../../../humidity-sensor/humidity-sensor-view-model';
import {PressureSensorViewModel} from '../../../pressure-sensor/pressure-sensor-view-model';


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
  gnssAntennas: GnssAntennaViewModel[];
  surveyedLocalTies: any[];
  frequencyStandards: any[];
  humiditySensors: HumiditySensorViewModel[];
  pressureSensors: PressureSensorViewModel[];
  temperatureSensors: any[];
  waterVaporSensors: any[];
  siteOwner: any[];
  siteContact: any[];
  siteMetadataCustodian: any;
  siteDataSource: any;
  moreInformation: any;
  dataStreamsSet: any;
}
