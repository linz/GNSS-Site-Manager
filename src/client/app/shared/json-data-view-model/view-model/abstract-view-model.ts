import {FieldMaps, FieldMap} from '../field-maps';
import {TypedPointer} from '../typed-pointer';

export abstract class AbstractViewModel {
  /**
   * Mapping to/from Data and View model fields.  See createFieldMappings().
   */
  private fieldMaps: FieldMaps;

  public getFieldMaps(): FieldMaps {
    return this.fieldMaps;
  }

  constructor() {
    this.createFieldMappings();
  }
  /**
   * Client calls this for each data/view field mappings to build fieldMaps.
   *
   * @param dataPath - path in the data model
   * @param dataPathType - type of data in that path
   * @param viewPath - path in the view model
   * @param viewPathType - type of data in that path
   * @returns {FieldMaps}
   */
  addFieldMapping(dataPath: string, dataPathType: string, viewPath: string, viewPathType: string): void {
    if (!this.fieldMaps) {
      this.fieldMaps = new FieldMaps();
    }
    if (dataPath.length === 0 || dataPathType.length === 0 || viewPath.length === 0 || viewPathType.length === 0) {
      throw new Error('expecting 4 data items - dataPath, dataPathType, viewPath, viewPathType');
    }
    this.assertCorrect(dataPath, dataPathType, viewPath, viewPathType);

    let dataTypePointer: TypedPointer = new TypedPointer(dataPath, dataPathType);
    let viewTypePointer: TypedPointer = new TypedPointer(viewPath, viewPathType);
    this.fieldMaps.add(new FieldMap(dataTypePointer, viewTypePointer));
  }

  private assertCorrect(dataPath: string, dataPathType: string, viewPath: string, viewPathType: string) {
    assert(dataPath.match(/\/.*/));
    assert(dataPathType.match(/number|string/));
    assert(viewPath.match(/\/.*/));
    assert(viewPathType.match(/number|string/));
  }

  /**
   * Simple way to specify the data / view model mappings.
   * @returns string[][]
   */
  public abstract createFieldMappings(): void;

  /**
   * Called on the 'last' object before creating a new one to populate it with some values such as endDate.
   */
  abstract setFinalValuesBeforeCreatingNewItem(): void;
}
