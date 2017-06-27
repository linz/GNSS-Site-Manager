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

    constructor() {
        super();
    }

    createFieldMappings(): void {

        this.addFieldMapping('/surveyedLocalTie/tiedMarkerName', 'string',
            '/tiedMarkerName', 'string');
        this.addFieldMapping('/surveyedLocalTie/tiedMarkerUsage', 'string',
            '/tiedMarkerUsage', 'string');
        this.addFieldMapping('/surveyedLocalTie/tiedMarkerCDPNumber', 'string',
            '/tiedMarkerCDPNumber', 'string');
        this.addFieldMapping('/surveyedLocalTie/tiedMarkerDOMESNumber', 'string',
            '/tiedMarkerDOMESNumber', 'string');
        this.addFieldMapping('/surveyedLocalTie/localSiteTiesAccuracy', 'string',
            '/localSiteTiesAccuracy', 'string');
        this.addFieldMapping('/surveyedLocalTie/surveyMethod', 'string',
            '/surveyMethod', 'string');

        this.addFieldMapping('/surveyedLocalTie/differentialComponentsGNSSMarkerToTiedMonumentITRS/dx', 'string',
            '/dx', 'number');
        this.addFieldMapping('/surveyedLocalTie/differentialComponentsGNSSMarkerToTiedMonumentITRS/dy', 'string',
            '/dy', 'number');
        this.addFieldMapping('/surveyedLocalTie/differentialComponentsGNSSMarkerToTiedMonumentITRS/dz', 'string',
            '/dz', 'number');

        this.addFieldMapping('/surveyedLocalTie/dateMeasured/value/0', 'string',
            '/startDate', 'date');

        this.addFieldMapping('/surveyedLocalTie/notes', 'string',
            '/notes', 'date');
    };
}
