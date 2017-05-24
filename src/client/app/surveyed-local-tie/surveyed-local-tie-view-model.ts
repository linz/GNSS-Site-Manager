import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class SurveyedLocalTieViewModel extends AbstractViewModel {

    public tiedMarkerName: string = '';
    public tiedMarkerUsage: string = '';
    public tiedMarkerCDPNumber: string = '';
    public tiedMarkerDOMESNumber: string = '';

    public dx: number = 0;
    public dy: number = 0;
    public dz: number = 0;

    public localSiteTiesAccuracy: string = '';
    public surveyMethod: string = '';
    public notes: string = '';

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

    /**
     * Overridden parent method to return false because SurveyedLocalTie does not have an end date.
     */
    hasEndDateField(): boolean {
        return false;
    }
}
