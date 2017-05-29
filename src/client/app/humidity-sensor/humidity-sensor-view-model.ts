import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class HumiditySensorViewModel extends AbstractViewModel {
    public calibrationDate: string = null;
    public dataSamplingInterval: number = null;
    public accuracyPercentRelativeHumidity: number = null;
    public aspiration: string = null;
    public notes: string = null;
    public manufacturer: string = null;
    public serialNumber: string = null;
    public heightDiffToAntenna: number = null;

    constructor() {
        super();
    }

    createFieldMappings(): void {
        this.addFieldMapping('/humiditySensor/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0',
            'string',
            '/startDate', 'date');

        this.addFieldMapping('/humiditySensor/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0',
            'string',
            '/endDate', 'date');

        this.addFieldMapping('/humiditySensor/calibrationDate/value/0', 'string',
            '/calibrationDate', 'date');

        this.addFieldMapping('/humiditySensor/dataSamplingInterval', 'string',
            '/dataSamplingInterval', 'number');

        this.addFieldMapping('/humiditySensor/accuracyPercentRelativeHumidity', 'string',
            '/accuracyPercentRelativeHumidity', 'number');

        this.addFieldMapping('/humiditySensor/aspiration', 'string',
            '/aspiration', 'string');

        this.addFieldMapping('/humiditySensor/notes', 'string',
            '/notes', 'string');

        this.addFieldMapping('/humiditySensor/manufacturer', 'string',
            '/manufacturer', 'string');

        this.addFieldMapping('/humiditySensor/serialNumber', 'string',
            '/serialNumber', 'string');

        this.addFieldMapping('/humiditySensor/heightDiffToAntenna', 'string',
            '/heightDiffToAntenna', 'number');
    };
}
