import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { ObjectMap } from '../shared/json-data-view-model/data-view-translator';

export class RadioInterferenceViewModel extends AbstractViewModel {
    public possibleProblemSource: string = null;
    public notes: string = null;
    public observedDegradation: string = null;

    constructor() {
        super();
    }

    public getObjectMap(): ObjectMap {
        throw new Error('Not supported');
    }

    createFieldMappings(): void {
    };
}
