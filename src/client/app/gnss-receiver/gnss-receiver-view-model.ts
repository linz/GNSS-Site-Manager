import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class GnssReceiverViewModel extends AbstractViewModel {
    public receiverType: string = null;
    public manufacturerSerialNumber: string = null;
    public firmwareVersion: string = null;
    public satelliteSystems: string[] = [];
    public elevationCutoffSetting: number = null;
    public temperatureStabilization: number = null;
    public notes: string = null;
}
