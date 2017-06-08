/**
 * This is the 'View Model' for Site Identification, though it is just the mapping for the dataModel to/from the form Model.
 *
 */
import { AbstractViewModel, dontSetDetfaults } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class SiteLocationMappings extends AbstractViewModel {
    constructor() {
        super(dontSetDetfaults);
    }

    createFieldMappings(): void {

        this.addFieldMapping('/city',
            'string',
            '/city', 'string');

        this.addFieldMapping('/state',
            'string',
            '/state', 'string');

        this.addFieldMapping('/countryCodeISO/value', 'string',
            '/countryCodeISO', 'string');
        this.addFieldMapping('/tectonicPlate/value', 'string',
            '/tectonicPlate', 'string');
        this.addFieldMapping('/notes', 'string',
            '/notes', 'string');

        this.addFieldMapping('/approximatePositionITRF/cartesianPosition/point/pos/value/0', 'string',
            '/cartesianPositionX', 'string');
        this.addFieldMapping('/approximatePositionITRF/cartesianPosition/point/pos/value/1', 'string',
            '/cartesianPositionY', 'string');
        this.addFieldMapping('/approximatePositionITRF/cartesianPosition/point/pos/value/2', 'string',
            '/cartesianPositionZ', 'string');
        this.addFieldMapping('/approximatePositionITRF/geodeticPosition/point/pos/value/0', 'string',
            '/geodeticPositionLat', 'string');
        this.addFieldMapping('/approximatePositionITRF/geodeticPosition/point/pos/value/1', 'string',
            '/geodeticPositionLong', 'string');
        this.addFieldMapping('/approximatePositionITRF/geodeticPosition/point/pos/value/2', 'string',
            '/geodeticPositionHeight', 'string');
    };

    /**
     * Overridden parent method to return false because SiteLocation does not have an end date.
     */
    hasEndDateField(): boolean {
        return false;
    }
}
