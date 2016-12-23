import {TypedPointer} from './typed-pointer';

/**
 * Mapping to assist in mapping data model to view model by linking both sides.
 * A collection of these defines a complete (for the application) or partial (for just one or a few sections of data)
 * mapping to translate one of view or data model to the other.
 */
export class FieldMaps {
  fieldMaps: FieldMap[] = [];

  public add(fieldMap: FieldMap) {
    this.fieldMaps.push(fieldMap);
  }
}

export class FieldMap {
  dataTypedPointer: TypedPointer;
  viewTypedPointer: TypedPointer;

  constructor(dataTypedPointer: TypedPointer, viewTypedPointer: TypedPointer) {
    this.dataTypedPointer = dataTypedPointer;
    this.viewTypedPointer = viewTypedPointer;
  }
}
