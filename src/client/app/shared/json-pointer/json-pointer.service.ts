import {Injectable} from '@angular/core';
import * as JsonPointer from 'json-pointer';

@Injectable()
export class JsonPointerService {

  /**
   * Get value at given path in the jsonObj
   * @param jsonObj
   * @param path into the jsonObj (that may or may not exist)
   * @returns {any} the value at given path in the jsonObj or null if it doesnt exist.
   */
  public static get(jsonObj: any, path: string): any {
    if (JsonPointer.has(jsonObj, path)) {
      return JsonPointer.get(jsonObj, path);
    } else {
      return null;
    }
  }

  /**
   * Get value at given path in the jsonObj as a string and '' if doesnt exist.
   * @param jsonObj
   * @param path into the jsonObj (that may or may not exist)
   * @returns {any} the string value at given path in the jsonObj or '' if it doesnt exist.
   */
  public static getString(jsonObj: any, path: string): string {
    let value: string = JsonPointerService.get(jsonObj, path);
    return  value ? value: '';
  }

  /**
   * Set the item (obj) at the path in jsonObj.  But only if it exists.
   *
   * @param jsonObj
   * @param path
   * @param value
   */
  public static set(jsonObj: any, path: string, value: any): void {
    if (value || value === 0 || value === '') {
      JsonPointer.set(jsonObj, path, value);
    }
  }

  /**
   *
   * @param jsonObj
   * @param path
   * @returns {boolean} if the path in jsonObj exists.
   */
  public static exists(jsonObj: any, path: string): boolean {
    return JsonPointer.has(jsonObj, path);
  }
}
