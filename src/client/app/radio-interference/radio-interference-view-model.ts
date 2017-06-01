import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class RadioInterferenceViewModel extends AbstractViewModel {
    public possibleProblemSource: string = null;
    public notes: string = null;
    public observedDegradation: string = null;

    constructor() {
        super();
    }

    createFieldMappings(): void {
        this.addFieldMapping('/radioInterference/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0',
            'string',
            '/startDate', 'date');

        this.addFieldMapping('/radioInterference/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0',
            'string',
            '/endDate', 'date');

        this.addFieldMapping('/radioInterference/possibleProblemSource', 'string',
            '/possibleProblemSource', 'string');

        this.addFieldMapping('/radioInterference/observedDegradation', 'string',
            '/observedDegradation', 'string');

        this.addFieldMapping('/radioInterference/notes', 'string',
            '/notes', 'string');
    };
}
