import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { MiscUtils } from '../shared/global/misc-utils';

export class FrequencyStandardViewModel extends AbstractViewModel {
    public standardType: string;
    public inputFrequency: number;
    public notes: string;

    /**
     * @param blank - if blank then don't add any default values - leave completely blank (empty) with '' | 0
     */
    constructor(blank: boolean = false) {
        super();
        this.standardType = '';
        this.inputFrequency = 0;
        this.notes = '';
    }

    createFieldMappings(): void {
        this.addFieldMapping('/frequencyStandard/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0',
            'string', '/startDate', 'string');

        this.addFieldMapping('/frequencyStandard/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0',
            'string', '/endDate', 'string');

        this.addFieldMapping('/frequencyStandard/standardType/value', 'string',
            '/standardType', 'string');

        this.addFieldMapping('/frequencyStandard/inputFrequency', 'string',
            '/inputFrequency', 'number');

        this.addFieldMapping('/frequencyStandard/notes', 'string',
            '/notes', 'string');
    };
}
