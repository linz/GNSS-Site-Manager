import {Injectable} from '@angular/core';
// import { HttpUtilsService } from '../global/http-utils.service';
import * as JsonPointer from 'json-pointer';
// declare let get: any;

@Injectable()
export class JsonPointerService {
  // private jsonPointer: any = require('json-pointer/index.js');
  // private viewPathMappingFile: string = '/assets/view-path-mapping.json';
  // private pathMappingJson: any = {};

  // constructor(private httpService: HttpUtilsService) {
  /*this.httpService.loadJsonObject(this.viewPathMappingFile).subscribe(
   (json: any) => this.pathMappingJson = json,
   (error: any) => console.log('Error in loading View-Path mapping Json file: ' + error)
   );*/
  // }

  public get(jsonObj: any, path: string): string {
    if (JsonPointer.has(jsonObj, path)) {
      return JsonPointer.get(jsonObj, path);
    } else {
      return null;
    }
    // return 'bozo';
  }

  public set(jsonObj: any, path: string, value: string): void {
    JsonPointer.set(jsonObj, path, value);
  }

  //
  public exists(jsonObj: any, path: string): boolean {
    return JsonPointer.has(jsonObj, path);
    // return true;
  }
}
