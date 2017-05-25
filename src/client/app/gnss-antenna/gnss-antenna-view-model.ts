import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class GnssAntennaViewModel extends AbstractViewModel {

    public antennaType: string = '';
    public serialNumber: string = '';
    public antennaReferencePoint: string = '';
    public markerArpEastEcc: number = 0;
    public markerArpUpEcc: number = 0;
    public markerArpNorthEcc: number = 0;
    public alignmentFromTrueNorth: number = 0;
    public antennaRadomeType: string = '';
    public radomeSerialNumber: string = '';
    public antennaCableType: string = '';
    public antennaCableLength: number = 0;
    public notes: string = '';

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
