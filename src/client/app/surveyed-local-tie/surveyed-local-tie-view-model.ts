import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class SurveyedLocalTieViewModel extends AbstractViewModel {

    /**
     * Not the best form making private fields public, however saves clutter of creating accessors / getters for all
     */
    public tiedMarkerName: string;
    public tiedMarkerUsage: string;
    public tiedMarkerCDPNumber: string;
    public tiedMarkerDOMESNumber: string;
    public dx: number;
    public dy: number;
    public dz: number;

    public localSiteTiesAccuracy: string;
    public surveyMethod: string;
    public notes: string;

    constructor() {
        super();
        this.tiedMarkerName = '';
        this.tiedMarkerUsage = '';
        this.tiedMarkerCDPNumber = '';
        this.tiedMarkerDOMESNumber = '';
        this.localSiteTiesAccuracy = '';
        this.surveyMethod = '';
        this.notes = '';
        this.dx = 0;
        this.dy = 0;
        this.dz = 0;
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
