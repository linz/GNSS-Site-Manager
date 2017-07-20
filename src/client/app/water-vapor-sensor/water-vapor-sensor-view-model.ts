import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class WaterVaporSensorViewModel extends AbstractViewModel {
    public type: string = null;
    public calibrationDate: string = null;
    public notes: string = null;
    public manufacturer: string = null;
    public serialNumber: string = null;
    public heightDiffToAntenna: number = null;
}
