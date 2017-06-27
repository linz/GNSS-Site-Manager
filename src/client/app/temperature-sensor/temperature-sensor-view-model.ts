import { ObjectMap } from '../shared/json-data-view-model/data-view-translator';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class TemperatureSensorViewModel extends AbstractViewModel {
    public calibrationDate: string = null;
    public dataSamplingInterval: number = null;
    public accuracyDegreesCelcius: number = null;
    public notes: string = null;
    public manufacturer: string = null;
    public serialNumber: string = null;
    public heightDiffToAntenna: number = null;
    public aspiration: string = null;

    constructor() {
        super();
    }

    public getObjectMap(): ObjectMap {
        throw new Error('Not supported');
    }

    createFieldMappings(): void {
    };
}
