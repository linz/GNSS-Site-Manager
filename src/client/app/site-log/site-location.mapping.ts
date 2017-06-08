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

        // These mappings handled in the DataViewTranslatorService
        // /point/pos/value/0 -> /cartesianPositionX
        // /point/pos/value/1 -> /cartesianPositionY
        // /point/pos/value/2 -> /cartesianPositionZ
        this.addFieldMapping('/approximatePositionITRF/cartesianPosition', 'point_data', '/cartesianPosition', 'point_view');

        // These mappings handled in the DataViewTranslatorService
        // /point/pos/value/0 -> /geodeticPositionLat
        // /point/pos/value/1 -> /geodeticPositionLong
        // /point/pos/value/2 -> /geodeticPositionHeight
        this.addFieldMapping('/approximatePositionITRF/geodeticPosition', 'point_data', '/geodeticPosition', 'point_view');
    };


    /**
     * Overridden parent method to return false because SiteLocation does not have an end date.
     */
    hasEndDateField(): boolean {
        return false;
    }
}
