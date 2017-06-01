import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class MultipathSourceViewModel extends AbstractViewModel {
    public possibleProblemSource: string = null;
    public notes: string = null;

    constructor() {
        super();
    }

    createFieldMappings(): void {
        this.addFieldMapping('/multipathSource/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0',
            'string',
            '/startDate', 'date');

        this.addFieldMapping('/multipathSource/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0',
            'string',
            '/endDate', 'date');

        this.addFieldMapping('/multipathSource/possibleProblemSource', 'string',
            '/possibleProblemSource', 'string');

        this.addFieldMapping('/multipathSource/notes', 'string',
            '/notes', 'string');
    };
}
