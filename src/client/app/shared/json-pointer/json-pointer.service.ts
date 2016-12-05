import {Injectable} from '@angular/core';
// import { HttpUtilsService } from '../global/http-utils.service';
import * as JsonPointer from 'json-pointer';
// declare let get: any;

@Injectable()
export class JsonPointerService {

  /**
   * Get value at given path in the jsonObj
   * @param jsonObj
   * @param path into the jsonObj (that may or may not exist)
   * @returns {any} the value at given path in the jsonObj or null if it doesnt exist.
   */
  public get(jsonObj: any, path: string): string {
    if (JsonPointer.has(jsonObj, path)) {
      return JsonPointer.get(jsonObj, path);
    } else {
      return null;
    }
  }

  /**
   * Set the item (obj) at the path in jsonObj.
   *
   * @param jsonObj
   * @param path
   * @param value
   */
  public set(jsonObj: any, path: string, value: string): void {
    JsonPointer.set(jsonObj, path, value);
  }

  /**
   *
   * @param jsonObj
   * @param path
   * @returns {boolean} if the path in jsonObj exists.
   */
  public exists(jsonObj: any, path: string): boolean {
    return JsonPointer.has(jsonObj, path);
  }
}
