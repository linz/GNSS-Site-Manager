import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class RadioInterferenceViewModel extends AbstractViewModel {
    public possibleProblemSource: string = null;
    public notes: string = null;
    public observedDegradation: string = null;
}
