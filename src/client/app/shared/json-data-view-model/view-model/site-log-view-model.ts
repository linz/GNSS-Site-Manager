import {GnssAntennaViewModel} from '../../../gnss-antenna/gnss-antenna-view-model';
import {FrequencyStandardViewModel} from '../../../frequency-standard/frequency-standard-view-model';
import {HumiditySensorViewModel} from '../../../humidity-sensor/humidity-sensor-view-model';
import {PressureSensorViewModel} from '../../../pressure-sensor/pressure-sensor-view-model';
import {TemperatureSensorViewModel} from '../../../temperature-sensor/temperature-sensor-view-model';
import {AbstractViewModel} from './abstract-view-model';

/**
 * View Model equivalent of ../data-model/SiteLogDataModel
 */
// TODO: Remove this extra level of nesting, if not needed.
export class SiteLogViewModel {
    siteLog: ViewSiteLog;
}

export class ViewSiteLog {
    siteIdentification: any;
    siteLocation: any;
    gnssReceivers: any[];
    gnssAntennas: GnssAntennaViewModel[];
    surveyedLocalTies: any[];
    frequencyStandards: FrequencyStandardViewModel[];
    humiditySensors: HumiditySensorViewModel[];
    pressureSensors: PressureSensorViewModel[];
    temperatureSensors: TemperatureSensorViewModel[];
    waterVaporSensors: any[];
    siteOwner: any[];
    siteContact: any[];
    siteMetadataCustodian: any;
    siteDataSource: any;
    moreInformation: any;
    dataStreamsSet: any;

    /**
     * Actions to take before saving.  They include:
     * - removing items with a 'dateDeleted', which was set when the item was removed
     */
    public beforeSave(): void {
        this.removeDeletedItems(this.humiditySensors);
    }

    private removeDeletedItems(items: AbstractViewModel[]) {
        // start at the end of the array so can delete item
        let index: number = items.length - 1;
        while (index >= 0) {
            console.log('removeDeletedItems - try index: ' + index + ' of items (length): ', items.length);
            if ('dateDeleted' in items[index] && items[index].dateDeleted && items[index].dateDeleted.length > 0) {
                items.splice(index, 1);
                console.log('deleted!');
            }
            index--;
        }
    }
}
