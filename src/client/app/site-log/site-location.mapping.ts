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
            '/cartesianPosition_x', 'string');
        this.addFieldMapping('/approximatePositionITRF/cartesianPosition/point/pos/value/1', 'string',
            '/cartesianPosition_y', 'string');
        this.addFieldMapping('/approximatePositionITRF/cartesianPosition/point/pos/value/2', 'string',
            '/cartesianPosition_z', 'string');
        this.addFieldMapping('/approximatePositionITRF/geodeticPosition/point/pos/value/0', 'string',
            '/geodeticPosition_lat', 'string');
        this.addFieldMapping('/approximatePositionITRF/geodeticPosition/point/pos/value/1', 'string',
            '/geodeticPosition_long', 'string');
        this.addFieldMapping('/approximatePositionITRF/geodeticPosition/point/pos/value/2', 'string',
            '/geodeticPosition_height', 'string');
    };

    /**
     * Called on the 'last' object before creating a new one to populate it with some values such as endDate.
     * Return what is changed as an object so the form can be patched.
     */
    setFinalValuesBeforeCreatingNewItem(): Object {
        // NOOP
        return {};
    }
}
