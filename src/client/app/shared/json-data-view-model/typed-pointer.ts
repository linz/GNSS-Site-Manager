/**
 * Tuple to assist in mapping data model to view model by defining one side of the relationship
 * pointer - Json Pointer path
 * type - type of the data defined at that path
 */
export class TypedPointer {
  pointer: string;
  type: string;

  constructor(pointer: string, type: string) {
    this.pointer = pointer;
    this.type = type;
  }
}
