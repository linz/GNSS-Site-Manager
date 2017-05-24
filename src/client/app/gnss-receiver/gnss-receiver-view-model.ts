import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class GnssReceiverViewModel extends AbstractViewModel {
    public receiverType: string = '';
    public manufacturerSerialNumber: string = '';
    public firmwareVersion: string = '';
    public satelliteSystem: string = '';
    public elevationCutoffSetting: number = 0;
    public temperatureStabilization: number = 0;
    public notes: string = '';

    constructor() {
        super();
    }

    createFieldMappings(): void {
        this.addFieldMapping('/gnssReceiver/igsModelCode/value', 'string', '/receiverType', 'string');
        this.addFieldMapping('/gnssReceiver/manufacturerSerialNumber', 'string', '/manufacturerSerialNumber', 'string');
        this.addFieldMapping('/gnssReceiver/firmwareVersion', 'string', '/firmwareVersion', 'string');
        this.addFieldMapping('/gnssReceiver/satelliteSystem/0/value', 'string', '/satelliteSystem', 'string');
        this.addFieldMapping('/gnssReceiver/elevationCutoffSetting', 'string', '/elevationCutoffSetting', 'number');
        this.addFieldMapping('/gnssReceiver/temperatureStabilization', 'string', '/temperatureStabilization', 'number');
        this.addFieldMapping('/gnssReceiver/dateInstalled/value/0', 'string', '/startDate', 'date');
        this.addFieldMapping('/gnssReceiver/dateRemoved/value/0', 'string', '/endDate', 'date');
        this.addFieldMapping('/gnssReceiver/notes', 'string', '/notes', 'string');
    };
}
