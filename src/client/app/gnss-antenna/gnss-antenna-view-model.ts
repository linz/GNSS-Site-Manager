import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { ObjectMap } from '../shared/json-data-view-model/data-view-translator';

export class GnssAntennaViewModel extends AbstractViewModel {

    public antennaType: string = null;
    public serialNumber: string = null;
    public antennaReferencePoint: string = null;
    public markerArpEastEcc: number = null;
    public markerArpUpEcc: number = null;
    public markerArpNorthEcc: number = null;
    public alignmentFromTrueNorth: number = null;
    public antennaRadomeType: string = null;
    public radomeSerialNumber: string = null;
    public antennaCableType: string = null;
    public antennaCableLength: number = null;
    public notes: string = null;

    constructor() {
        super();
    }

    public getObjectMap(): ObjectMap {
        throw new Error('Not supported');
    }

    createFieldMappings(): void {
    };
}
