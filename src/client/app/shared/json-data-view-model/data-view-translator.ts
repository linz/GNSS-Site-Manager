import {JsonPointerService} from '../json-pointer/json-pointer.service';
import {FieldMaps} from './field-maps';
import {TypedPointer} from './typed-pointer';
import {AbstractViewModel} from './view-model/abstract-view-model';

export class DataViewTranslatorService {

  /**
   * Translate from data and view models.
   * @param dataModel is input.  Its paths should match the fieldMappings.dataModel
   * @param viewModel is populated.  It should exist as on object upon entry.  Its paths should match the
   * fieldMappings.viewModel
   * @param fieldMappings to/from data and view
   */
  static translateD2V<T extends AbstractViewModel>(dataModel: any, viewModel: T, fieldMappings: FieldMaps): void {
    for (let fieldMap of fieldMappings.fieldMaps) {
      let dataTypedPointer: TypedPointer = fieldMap.dataTypedPointer;
      let viewTypedPointer: TypedPointer = fieldMap.viewTypedPointer;
      let dataValue: string = JsonPointerService.get(dataModel, dataTypedPointer.pointer);
      if (viewTypedPointer.type === 'number') {
        JsonPointerService.set(viewModel, viewTypedPointer.pointer, parseFloat(dataValue));
      } else {
        JsonPointerService.set(viewModel, viewTypedPointer.pointer, dataValue);
      }
    }
  }

  /**
   * Translate from view and data models.
   * @param viewModel is input.  Its paths should match the fieldMappings.viewModel
   * @param dataModel is populated.  It should exist as on object upon entry.  Its paths should match the
   * fieldMappings.dataModel
   * @param fieldMappings to/from data and view
   */
  static translateV2D<T extends AbstractViewModel>(viewModel: T, dataModel: any, fieldMappings: FieldMaps): any {
    for (let fieldMap of fieldMappings.fieldMaps) {
      let dataTypedPointer: TypedPointer = fieldMap.dataTypedPointer;
      let viewTypedPointer: TypedPointer = fieldMap.viewTypedPointer;
      let viewValue: string = JsonPointerService.get(viewModel, viewTypedPointer.pointer);
      if (dataTypedPointer.type === 'number') {
        JsonPointerService.set(dataModel, dataTypedPointer.pointer, parseFloat(viewValue));
      } else {
        JsonPointerService.set(dataModel, dataTypedPointer.pointer, viewValue);
      }
    }
  }
}
