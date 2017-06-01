import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class SignalObstructionViewModel extends AbstractViewModel {
    public possibleProblemSource: string = null;
    public notes: string = null;

    constructor() {
        super();
    }

    createFieldMappings(): void {
        this.addFieldMapping('/signalObstruction/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0',
            'string',
            '/startDate', 'date');

        this.addFieldMapping('/signalObstruction/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0',
            'string',
            '/endDate', 'date');

        this.addFieldMapping('/signalObstruction/possibleProblemSource', 'string',
            '/possibleProblemSource', 'string');

        this.addFieldMapping('/signalObstruction/notes', 'string',
            '/notes', 'string');
    };
}
