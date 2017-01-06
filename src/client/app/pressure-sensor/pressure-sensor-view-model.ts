import {AbstractViewModel} from '../shared/json-data-view-model/view-model/abstract-view-model';
import {MiscUtils} from '../shared/global/misc-utils';

export class PressureSensorViewModel extends AbstractViewModel {
  /**
   * Not the best form making fields public, however saves clutter of creating accessors / getters for all
   */
  public startDate: string;
  public endDate: string;

  public calibrationDate: string;

  public dataSamplingInterval: number;
  public accuracyHpa: number;
  public notes: string;
  public manufacturer: string;
  public serialNumber: string;
  public heightDiffToAntenna: number;

  constructor() {
    super();
    let presentDT: string = MiscUtils.getPresentDateTime();

    this.startDate = presentDT;
    this.calibrationDate = presentDT;
    this.endDate = '';
    this.dataSamplingInterval =  0;
    this.accuracyHpa = 0;
    this.notes = '';
    this.manufacturer = '';
    this.serialNumber = '';
    this.heightDiffToAntenna = 0;
  }

  // TODO - remove type field and use generics instead
  createFieldMappings(): void {
      this.addFieldMapping('/pressureSensor/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0',
        'string',
        '/startDate', 'string');

      this.addFieldMapping('/pressureSensor/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0',
        'string',
        '/endDate', 'string');

      this.addFieldMapping('/pressureSensor/calibrationDate/value/0', 'string',
        '/calibrationDate', 'string');

      this.addFieldMapping('/pressureSensor/dataSamplingInterval', 'string',
        '/dataSamplingInterval', 'number');

      this.addFieldMapping('/pressureSensor/accuracyHpa', 'string',
        '/accuracyHpa', 'number');

      this.addFieldMapping('/pressureSensor/notes', 'string',
        '/notes', 'string');

      this.addFieldMapping('/pressureSensor/manufacturer', 'string',
        '/manufacturer', 'string');

      this.addFieldMapping('/pressureSensor/serialNumber', 'string',
        '/serialNumber', 'string');

      this.addFieldMapping('/pressureSensor/heightDiffToAntenna', 'string',
        '/heightDiffToAntenna', 'number');
  };

  /**
   * Called on the 'last' object before creating a new one to populate it with some values such as endDate.
   */
  setFinalValuesBeforeCreatingNewItem(): void {
    let presentDT: string = MiscUtils.getPresentDateTime();

    this.endDate=presentDT;
  }
}
