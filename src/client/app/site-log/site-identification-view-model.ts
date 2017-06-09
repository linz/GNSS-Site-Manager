/**
 * This is the 'View Model' for Site Identification.
 *
 */
import { AbstractViewModel, dontSetDetfaults } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class SiteIdentificationViewModel extends AbstractViewModel {
    public siteName: string = null;
    public fourCharacterID: string = null;
    public monumentInscription: string = null;
    public iersDOMESNumber: string = null;
    public cdpNumber: string = null;
    public monumentDescription: string = null;
    public heightOfTheMonument: number = null;
    public monumentFoundation: string = null;
    public foundationDepth: number = null;
    public markerDescription: string = null;
    public dateInstalled: string = null;
    public geologicCharacteristic: string = null;
    public bedrockType: string = null;
    public bedrockCondition: string = null;
    public fractureSpacing: string = null;
    public faultZonesNearby: string = null;
    public distanceActivity: string = null;
    public notes: string = null;

    constructor() {
        super(dontSetDetfaults);
    }

    createFieldMappings(): void {

        this.addFieldMapping('/bedrockCondition', 'string',
            '/bedrockCondition', 'string');

        this.addFieldMapping('/bedrockType', 'string',
            '/bedrockType', 'string');

        this.addFieldMapping('/cdpNumber', 'string',
            '/cdpNumber', 'string');

        this.addFieldMapping('/dateInstalled/value/0', 'string',
            '/dateInstalled', 'string');

        this.addFieldMapping('/distanceActivity', 'string',
            '/distanceActivity', 'string');

        this.addFieldMapping('/faultZonesNearby/value', 'string',
            '/faultZonesNearby', 'string');

        this.addFieldMapping('/foundationDepth', 'string',
            '/foundationDepth', 'string');

        this.addFieldMapping('/fourCharacterID', 'string',
            '/fourCharacterID', 'string');

        this.addFieldMapping('/fractureSpacing', 'string',
            '/fractureSpacing', 'string');

        this.addFieldMapping('/geologicCharacteristic/value', 'string',
            '/geologicCharacteristic', 'string');

        this.addFieldMapping('/heightOfTheMonument', 'string',
            '/heightOfTheMonument', 'string');

        this.addFieldMapping('/iersDOMESNumber', 'string',
            '/iersDOMESNumber', 'string');

        this.addFieldMapping('/markerDescription', 'string',
            '/markerDescription', 'string');

        this.addFieldMapping('/monumentDescription/value', 'string',
            '/monumentDescription', 'string');

        this.addFieldMapping('/monumentFoundation', 'string',
            '/monumentFoundation', 'string');

        this.addFieldMapping('/monumentInscription', 'string',
            '/monumentInscription', 'string');

        this.addFieldMapping('/notes', 'string',
            '/notes', 'string');

        this.addFieldMapping('/siteName', 'string',
            '/siteName', 'string');

        this.addFieldMapping('/objectMap', 'object', '/objectMap', 'object');
    };

    /**
     * Overridden parent method to return false because SiteIdentification does not have an end date.
     */
    hasEndDateField(): boolean {
        return false;
    }
}
