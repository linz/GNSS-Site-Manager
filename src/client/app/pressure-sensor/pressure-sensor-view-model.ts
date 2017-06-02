import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class PressureSensorViewModel extends AbstractViewModel {
    public calibrationDate: string = null;
    public dataSamplingInterval: number = null;
    public accuracyHPa: number = null;
    public notes: string = null;
    public manufacturer: string = null;
    public serialNumber: string = null;
    public heightDiffToAntenna: number = null;

    constructor() {
        super();
    }

    // TODO - remove type field and use generics instead
    createFieldMappings(): void {
        this.addFieldMapping('/pressureSensor/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0',
            'string',
            '/startDate', 'date');

        this.addFieldMapping('/pressureSensor/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0',
            'string',
            '/endDate', 'date');

        this.addFieldMapping('/pressureSensor/calibrationDate/value/0', 'string',
            '/calibrationDate', 'date');

        this.addFieldMapping('/pressureSensor/dataSamplingInterval', 'string',
            '/dataSamplingInterval', 'number');

        this.addFieldMapping('/pressureSensor/accuracyHPa', 'string',
            '/accuracyHPa', 'number');

        this.addFieldMapping('/pressureSensor/notes', 'string',
            '/notes', 'string');

        this.addFieldMapping('/pressureSensor/manufacturer', 'string',
            '/manufacturer', 'string');

        this.addFieldMapping('/pressureSensor/serialNumber', 'string',
            '/serialNumber', 'string');

        this.addFieldMapping('/pressureSensor/heightDiffToAntenna', 'string',
            '/heightDiffToAntenna', 'number');
    };
}
