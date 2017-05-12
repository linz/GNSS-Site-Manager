import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { MiscUtils } from '../shared/global/misc-utils';

export class GnssReceiverViewModel extends AbstractViewModel {
    public receiverType: string;
    public manufacturerSerialNumber: string;
    public firmwareVersion: string;
    public satelliteSystem: string;
    public elevationCutoffSetting: number;
    public temperatureStabilization: number;
    public notes: string;

    /**
     *
     * @param blank - if blank then don't add any default values - leave completely blank (empty) with '' | 0
     */
    constructor(blank: boolean = false) {
        super();//dontSetDetfaults);

        this.receiverType = '';
        this.manufacturerSerialNumber = '';
        this.firmwareVersion = '';
        this.satelliteSystem = '';

        this.elevationCutoffSetting = 0;
        this.temperatureStabilization = 0;
        this.notes = '';
    }

    createFieldMappings(): void {
        this.addFieldMapping('/gnssReceiver/igsModelCode/value', 'string', '/receiverType', 'string');
        this.addFieldMapping('/gnssReceiver/manufacturerSerialNumber', 'string', '/manufacturerSerialNumber', 'string');
        this.addFieldMapping('/gnssReceiver/firmwareVersion', 'string', '/firmwareVersion', 'string');
        this.addFieldMapping('/gnssReceiver/satelliteSystem/0/value', 'string', '/satelliteSystem', 'string');
        this.addFieldMapping('/gnssReceiver/elevationCutoffSetting', 'string', '/elevationCutoffSetting', 'number');
        this.addFieldMapping('/gnssReceiver/temperatureStabilization', 'string', '/temperatureStabilization', 'number');
        this.addFieldMapping('/gnssReceiver/dateInstalled/value/0', 'string', '/startDate', 'string');
        this.addFieldMapping('/gnssReceiver/dateRemoved/value/0', 'string', '/endDate', 'string');
        this.addFieldMapping('/gnssReceiver/notes', 'string', '/notes', 'string');
    };
}
