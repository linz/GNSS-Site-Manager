import { Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';
import { MiscUtilsService } from './misc-utils.service';

@Injectable()
export class JsonDiffService {
  private lodash: any = require('lodash');
  private xmlAttrMappingFile: string = '/assets/xml-attr-mapping.json';
  private ADD: string = 'Add';
  private REMOVE: string = 'Remove';
  private UPDATE: string = 'Update';
  private attrMappingJson: any = {};

  constructor(private httpService: HttpUtilsService, private utilsService: MiscUtilsService) {
    // Load the XML attribute name mapping JSON object from assets
    this.httpService.loadJsonObject(this.xmlAttrMappingFile).subscribe(
      json => this.attrMappingJson = json,
      error => console.log('Error in loading Json file: ' + error)
    );
  }

  public getJsonDiffHtml(oldJson: any , newJson: any): string {
    let jsonDiff: any = this.compare(oldJson, newJson, []);
    let diffArray: any = this.detectChanges(jsonDiff);
    let result: string = this.formatToHtml(diffArray);
    return result;
  }

  private formatToHtml(_array: any): string {
    let fmtHtml: string = '';
    for (let key in _array) {
      fmtHtml += this.formatToTable(key, _array[key]);
    }
    return fmtHtml;
  }

  private getMappedName(attrName: string): string {
    attrName = attrName.trim();
    if (! attrName === null) {
      return '';
    }
    // We want first word token in key as eg. might receive 'gnssReceiver (2016-11-15)'
    let normalAttrName: string = attrName.replace(/^(\w+).*/, '$1');
    let attrRemainder: string = attrName.replace(/^\w+(.*)/, '$1');
    attrRemainder = attrRemainder ? ' ' + attrRemainder : '';
    console.log('map key: '+ attrName + ', first token: "'+ normalAttrName + '"');
    if (this.attrMappingJson[normalAttrName] === undefined) {
      console.log('  not in mapping');
      return attrName;
    }
    let map: string = this.attrMappingJson[normalAttrName] + attrRemainder;
    console.log(' mapped to: :', map);
    return map;
  }

  private formatToTable(tableName: string, rows: any): string {
    let tableHtml: string = '';
    if (!tableName || !rows || rows.length === 0) {
      return tableHtml;
    }

    tableHtml += '<table class="table table-striped table-hover">';
    tableHtml += '<caption>'+tableName+'<caption>';
    tableHtml += '<thead><tr><th title="Attribute name">Attribute</th>'
              + '<th>Old value</th><th>New value</th></tr></thead>';
    tableHtml += '<tbody>';
    for (let row of rows) {
      tableHtml += '<tr><td>' + this.getMappedName(row.attrName) + '</td><td>'
                + row.oldValue + '</td><td>' + row.newValue + '</td></tr>';
    }
    tableHtml += '</tbody></table>';
    return tableHtml;
  }

  detectChanges(jsonObj: any): any {
    let newJsonObj: any = [];
    let differenceArray: any = [];
    for (let obj of jsonObj) {
      console.log('detectChanges - key: ', obj.key);
      if (obj.key === 'gnssReceivers' ||
          obj.key === 'gnssAntennas' ||
          obj.key === 'humiditySensors' ||
          obj.key === 'localEpisodicEventsSet' ||
          obj.key === 'frequencyStandards') {
        for (let o1 of obj.changes) {
          for (let o2 of o1.changes) {
            newJsonObj.push(o2);
          }
        }
      } else {
        newJsonObj.push(obj);
      }
    }

    for (let obj of newJsonObj) {
      let title: any = this.formatTitle(obj.key);
      if (differenceArray[title] === undefined) {
        differenceArray[title] = [];
      }
      this.traverse(differenceArray, obj, title);
    }

    return differenceArray;
  }

  private traverse(differenceArray: any, jsonObj: any, key: string) {
    let objType: string = this.utilsService.getObjectType(jsonObj);
    if (objType === 'Object') {
      this.traverseObj(differenceArray, jsonObj, key);
    } else if (objType === 'Array') {
      for (let obj of jsonObj) {
        this.traverse(differenceArray, obj, key);
      }
    } else {
      console.log('Unknown JSON type: '+objType);
    }

    return differenceArray;
  }

  private traverseObj(differenceArray:any, obj: any, key: string): any {
    if (obj.changes) {
      for (let change of obj.changes) {
        this.traverse(differenceArray, change, key);
      }
    } else if ( !this.isEmpty(obj.value) ) {
      let changeObj: any = {attrName: obj.key, action: obj.type, oldValue: '', newValue: ''};
      if (obj.type === this.UPDATE) {
        changeObj.oldValue = obj.oldValue;
        changeObj.newValue = obj.value;
      } else if (obj.type === this.REMOVE) {
        changeObj.oldValue = obj.value;
      } else if (obj.type === this.ADD) {
        changeObj.newValue = obj.value;
      } else {
        console.log('Unknown action type: ' + obj.type + ' for ' + obj.key);
      }
      differenceArray[<any>key].push(changeObj);
    }

    return differenceArray;
  }

  /*
   * Format the key from xml to how it should be displayed in the diff
   */
  private formatTitle(key: string): string {
    let returnVal: string = '';
    if (key === null || key.trim().length === 0) {
      returnVal = '';
    }

    // TODO - to be replaced by better mechanism of attribute mapping.  Removed this once happy it works.
    // if (key === 'siteIdentification' || key === 'siteLocation') {
    //   return 'Site Information';
    // } else if (key.startsWith('gnss')) {
    //   return 'GNSS ' + key.substring(4);
    // } else if (key === 'siteMetadataCustodian') {
    //   return 'Site Metadata Custodian';
    // } else if (key === 'siteContact') {
    //   return 'Site Contact';
    // } else {
    //   return this.getMappedName(key);
    // }
    returnVal = this.getMappedName(key);
    console.log('formatTitle - key: '+key+', return title: ', returnVal);
    return returnVal;
  }

  private getKey(path: any): string {
    let index: number = 1;
    let key: string = path[path.length - index];
    let excludedKeys: any = ['value', 'id', 'gco:CharacterString', 'characterString', 'codeListValue'];
    while (this.contains(excludedKeys, key) && index < path.length) {
      index += 1;
      key = path[path.length - index];
    }
    return key;
  }

  private contains(array: any, item: string): boolean {
    for (let k of array) {
      if (k === item) {
        return true;
      }
    }
    return false;
  }

  compare(oldObj: any, newObj: any, path: any): any {
    let changes: any = [];
    let typeOfOldObj: any = this.utilsService.getObjectType(oldObj);
    // console.log('compare - objType: '+ typeOfOldObj+', path: ['+path+'], newObj: ', newObj);
    switch (typeOfOldObj) {
      case 'Date':
        changes = changes.concat(this.comparePrimitives(oldObj.getTime(), newObj.getTime(), path));
        break;
      case 'Object':
        let diffs: any = this.compareObject(oldObj, newObj, path, false);
        if (diffs.length > 0) {
          if (path.length > 0) {
            changes.push({
              type: this.UPDATE,
              key: this.getKey(path),
              changes: diffs
            });
          } else {
            changes = changes.concat(diffs);
          }
        }
        break;
      case 'Array':
        changes = changes.concat(this.compareArray(oldObj, newObj, path));
        break;
      case 'Function':
        break;
      default:
        changes = changes.concat(this.comparePrimitives(oldObj, newObj, path));
    }
    return changes;
  }

  private compareObject(oldObj: any, newObj: any, path: any, skipPath: boolean): any {
    // console.log('compareObject - path: ['+path+'], skipPath: '+skipPath+', newObj: ', newObj);

    let changes: any = [];
    let oldObjKeys: any = Object.keys(oldObj);
    let newObjKeys: any = Object.keys(newObj);
    let intersectionKeys: any = this.lodash.intersection(oldObjKeys, newObjKeys);
    for (let k of intersectionKeys) {
      let newPath: any = skipPath ? path : path.concat([this.addDateString(newObj, k)]);
      let diffs: any = this.compare(oldObj[k], newObj[k], newPath);
      if (diffs.length > 0) {
        changes = changes.concat(diffs);
      }
    }

    let addedKeys: any = this.lodash.difference(newObjKeys, oldObjKeys);
    for (let k of addedKeys) {
      let newPath: any = skipPath ? path : path.concat([this.addDateString(newObj, k)]);
      changes.push({
        type: this.ADD,
        key: this.getKey(newPath),
        value: newObj[k]
      });
    }

    // It won't happen as we don't remove any paths from JSON object
    let deletedKeys: any = this.lodash.difference(oldObjKeys, newObjKeys);
    for (let k of deletedKeys) {
      let newPath: any = skipPath ? path : path.concat([k]);
      changes.push({
        type: this.REMOVE,
        key: this.getKey(newPath),
        value: oldObj[k]
      });
    }
    return changes;
  }

  private compareArray(oldObj: any, newObj: any, path: any): any {
    // console.log('compareArray - path: ['+path+'], newObj: ', newObj);
    let indexedOldObj: any = this.convertArrayToObj(oldObj);
    let indexedNewObj: any = this.convertArrayToObj(newObj);
    let diffs: any = this.compareObject(indexedOldObj, indexedNewObj, path, true);
    if (diffs.length > 0) {
      return [
        {
          type: this.UPDATE,
          key: this.getKey(path),
          embededKey: path[0],
          changes: diffs
        }
      ];
    }
    return [];
  }

  private convertArrayToObj(array: any): any {
    let obj: any = {};
    for (let key in array) {
      obj[key] = array[key];
    }
    return obj;
  }

  private comparePrimitives(oldObj: any, newObj: any, path: string): string {
    let changes: any = [];
    if ( !this.isEqual(oldObj, newObj) ) {
      if ( this.isEmpty(newObj) ) {
        changes.push({
          type: this.REMOVE,
          key: this.getKey(path),
          value: oldObj
        });
      } else if ( this.isEmpty(oldObj) ) {
        changes.push({
          type: this.ADD,
          key: this.getKey(path),
          value: newObj
        });
      } else {
        changes.push({
          type: this.UPDATE,
          key: this.getKey(path),
          value: newObj,
          oldValue: oldObj
        });
      }
    }
    return changes;
  }

  // Typescript does not support '==' and '!='. E.g., 0 != '0'
  private isEqual(oldObj: any, newObj: any): boolean {
    if (oldObj === null || newObj === null) {
      return (oldObj === newObj);
    }
    let oldType: string = this.utilsService.getObjectType(oldObj);
    let newType: string = this.utilsService.getObjectType(newObj);
    if (oldType === newType) {
      return (oldObj === newObj);
    } else if (oldType === 'String' && newType === 'Number') {
      let newObj1: string = newObj.toString();
      return (oldObj === newObj1);
    } else if (oldType === 'Number' && newType === 'String') {
      let oldObj1: string = oldObj.toString();
      return (oldObj1 === newObj);
    } else {
      return (oldObj === newObj);
    }
  }

  private isEmpty(obj: any): boolean {
    let objType: string = this.utilsService.getObjectType(obj);
    if (objType === null || objType === 'undefined') {
      return true;
    } else if (objType === 'String' && obj.trim() === '') {
      return true;
    } else if (typeof obj === 'Array' && obj.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Given an object with maps and arrays, and a path of those maps and arrays find the value at path.  Or '' if
   * any part of path doesn't exist.
   *
   * @param path in object structure - eg 'a.b.1' (array indices are .X)
   * @param obj with path eg. alpha = {a: {b: [fred, whilma, barney]}}
   * @returns object at path in obj or '' - eg. resolves to 'whilma'
   */
  private resolveObjectPath(obj: any, path: string) {
    let a:any =  path.split('.').reduce(function(prev, curr) {
      return prev ? prev[curr] : undefined;
    }, obj || self);

    return a?a:'';
  }

  getDate(obj: any, dateType: string, position: string): string {
    if (dateType === 'dateInstalledRemoved') {
      if (position === 'start') {
        return this.resolveObjectPath(obj, 'dateInstalled.value.0');
      } else {
        return this.resolveObjectPath(obj, 'dateRemoved.value.0');
      }
    }
    if (dateType === 'dateBeginEnd') {
      if (position === 'start') {
        // return this.dateFromPath(obj, "validTime.abstractTimePrimitive.['gml:TimePeriod'].beginPosition.value.[0]");
        return this.resolveObjectPath(obj, 'validTime.abstractTimePrimitive.gml:TimePeriod.beginPosition.value.0');
      } else {
        return this.resolveObjectPath(obj, 'validTime.abstractTimePrimitive.gml:TimePeriod.endPosition.value.0');
      }
    }

    return 'getDate() - unkonwn dateType: '+ dateType;
  }

   // TODO - once we have types (eg. HumiditySensorClass) then delegate this function to that
  addDateString(obj: any, key: string): string {
    let obj1: any;
    let startDate: any;
    let endDate: any;
    let dateStr: string = '';

    // console.log('addDateString - key: '+key+', obj:', obj);

    if (obj.gnssReceiver) {
      obj1 = obj.gnssReceiver;
      startDate = this.getDate(obj1, 'dateInstalledRemoved', 'start');
      endDate = this.getDate(obj1, 'dateInstalledRemoved', 'end');
    } else if (obj.gnssAntenna) {
      obj1 = obj.gnssAntenna;
      startDate = this.getDate(obj1, 'dateInstalledRemoved', 'start');
      endDate = this.getDate(obj1, 'dateInstalledRemoved', 'end');
    } else if (obj.humiditySensor) {
      obj1 = obj.humiditySensor;
      startDate = this.getDate(obj1, 'dateBeginEnd', 'start');
      endDate = this.getDate(obj1, 'dateBeginEnd', 'end');
    } else if (obj.localEpisodicEvents) {
      obj1 = obj.localEpisodicEvents;
      startDate = this.getDate(obj1, 'dateBeginEnd', 'start');
      endDate = this.getDate(obj1, 'dateBeginEnd', 'end');
    } else if (obj.frequencyStandard) {
      obj1 = obj.frequencyStandard;
      startDate = this.getDate(obj1, 'dateBeginEnd', 'start');
      endDate = this.getDate(obj1, 'dateBeginEnd', 'end');
    } else {
      return key;
    }
    dateStr = '(' + startDate.substring(0, 10);
    if (endDate) {
      dateStr += ' &ndash; ' + endDate.substring(0, 10);
    }
    dateStr += ')';

    return (dateStr === '') ? key : (key + ' ' + dateStr);
  }
}
