import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class SurveyedLocalTieViewModel extends AbstractViewModel {

    public tiedMarkerName: string = null;
    public tiedMarkerUsage: string = null;
    public tiedMarkerCDPNumber: string = null;
    public tiedMarkerDOMESNumber: string = null;

    public dx: number = null;
    public dy: number = null;
    public dz: number = null;

    public localSiteTiesAccuracy: string = null;
    public surveyMethod: string = null;
    public notes: string = null;
}
