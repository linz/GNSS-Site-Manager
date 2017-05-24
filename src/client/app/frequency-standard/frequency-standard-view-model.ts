import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class FrequencyStandardViewModel extends AbstractViewModel {
    public standardType: string;
    public inputFrequency: number;
    public notes: string;

    constructor() {
        super();
        this.standardType = '';
        this.inputFrequency = 0;
        this.notes = '';
    }

    createFieldMappings(): void {
        this.addFieldMapping('/frequencyStandard/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0',
            'string', '/startDate', 'date');

        this.addFieldMapping('/frequencyStandard/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0',
            'string', '/endDate', 'date');

        this.addFieldMapping('/frequencyStandard/standardType/value', 'string',
            '/standardType', 'string');

        this.addFieldMapping('/frequencyStandard/inputFrequency', 'string',
            '/inputFrequency', 'number');

        this.addFieldMapping('/frequencyStandard/notes', 'string',
            '/notes', 'string');
    };
}
