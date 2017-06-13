/**
 * This is the 'View Model' for Site Location.
 *
 */
import { AbstractViewModel, dontSetDetfaults } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class CartesianPosition {
    public x: number = null;
    public y: number = null;
    public z: number = null;
}

export class GeodeticPosition {
    public lat: number = null;
    public lon: number = null;
    public height: number = null;
}

export class SiteLocationViewModel extends AbstractViewModel {
    public city: string = null;
    public state: string = null;
    public countryCodeISO: string = null;
    public cartesianPosition: CartesianPosition = new CartesianPosition();
    public geodeticPosition: GeodeticPosition = new GeodeticPosition();
    public tectonicPlate: string = null;
    public notes: string = null;
    public dateDeleted: string = null;
    public dateInserted: string = null;
    public deletedReason: string = null;

    constructor() {
        super(dontSetDetfaults);
    }

    createFieldMappings(): void {

        this.addFieldMapping('/city', 'string', '/city', 'string');
        this.addFieldMapping('/state', 'string', '/state', 'string');
        this.addFieldMapping('/countryCodeISO/value', 'string', '/countryCodeISO', 'string');
        this.addFieldMapping('/tectonicPlate/value', 'string', '/tectonicPlate', 'string');
        this.addFieldMapping('/notes', 'string', '/notes', 'string');

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

        this.addSuperFieldMappings();
        this.addFieldMapping('/objectMap', 'object', '/objectMap', 'object');
    };
}
