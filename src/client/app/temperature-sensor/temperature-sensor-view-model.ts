import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class TemperatureSensorViewModel extends AbstractViewModel {
    public calibrationDate: string = null;
    public dataSamplingInterval: number = null;
    public accuracyDegreesCelcius: number = null;
    public notes: string = null;
    public manufacturer: string = null;
    public serialNumber: string = null;
    public heightDiffToAntenna: number = null;

    constructor() {
        super();
    }

    createFieldMappings(): void {
        this.addFieldMapping('/temperatureSensor/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0',
            'string',
            '/startDate', 'date');

        this.addFieldMapping('/temperatureSensor/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0',
            'string',
            '/endDate', 'date');

        this.addFieldMapping('/temperatureSensor/calibrationDate/value/0', 'string',
            '/calibrationDate', 'date');

        this.addFieldMapping('/temperatureSensor/dataSamplingInterval', 'string',
            '/dataSamplingInterval', 'number');

        this.addFieldMapping('/temperatureSensor/accuracyDegreesCelcius', 'string',
            '/accuracyDegreesCelcius', 'number');

        this.addFieldMapping('/temperatureSensor/notes', 'string',
            '/notes', 'string');

        this.addFieldMapping('/temperatureSensor/manufacturer', 'string',
            '/manufacturer', 'string');

        this.addFieldMapping('/temperatureSensor/serialNumber', 'string',
            '/serialNumber', 'string');

        this.addFieldMapping('/temperatureSensor/heightDiffToAntenna', 'string',
            '/heightDiffToAntenna', 'number');
    };
}
