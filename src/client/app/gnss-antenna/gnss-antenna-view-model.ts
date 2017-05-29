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

    constructor() {
        super();
    }

    createFieldMappings(): void {
        this.addFieldMapping('/gnssAntenna/dateInstalled/value/0', 'string', '/startDate', 'date');
        this.addFieldMapping('/gnssAntenna/dateRemoved/value/0', 'string', '/endDate', 'date');
        this.addFieldMapping('/gnssAntenna/igsModelCode/value', 'string', '/antennaType', 'string');
        this.addFieldMapping('/gnssAntenna/manufacturerSerialNumber', 'string', '/serialNumber', 'string');
        this.addFieldMapping('/gnssAntenna/antennaReferencePoint/value', 'string', '/antennaReferencePoint', 'string');
        this.addFieldMapping('/gnssAntenna/markerArpEastEcc', 'string', '/markerArpEastEcc', 'number');
        this.addFieldMapping('/gnssAntenna/markerArpUpEcc', 'string', '/markerArpUpEcc', 'number');
        this.addFieldMapping('/gnssAntenna/markerArpNorthEcc', 'string', '/markerArpNorthEcc', 'number');
        this.addFieldMapping('/gnssAntenna/alignmentFromTrueNorth', 'string', '/alignmentFromTrueNorth', 'number');
        this.addFieldMapping('/gnssAntenna/antennaRadomeType/value', 'string', '/antennaRadomeType', 'string');
        this.addFieldMapping('/gnssAntenna/radomeSerialNumber', 'string', '/radomeSerialNumber', 'string');
        this.addFieldMapping('/gnssAntenna/antennaCableType', 'string', '/antennaCableType', 'string');
        this.addFieldMapping('/gnssAntenna/antennaCableLength', 'string', '/antennaCableLength', 'number');
        this.addFieldMapping('/gnssAntenna/notes', 'string', '/notes', 'string');
    };
}
