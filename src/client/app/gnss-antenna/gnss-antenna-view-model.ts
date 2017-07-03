import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

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
}
