import { Injectable } from '@angular/core';

@Injectable()
export class JsonDiffService {
  private lodash: any = require('lodash');
  private ADD: string = 'Add';
  private REMOVE: string = 'Remove';
  private UPDATE: string = 'Update';
  private diffArray: Array<any>;

  constructor() {
    this.diffArray = [];
  }

  public getJsonDiffHtml(oldJson: any , newJson: any): string {
    this.diffArray = [];
    let jsonDiff: any = this.compare(oldJson, newJson, []);
    this.detectChanges(jsonDiff);
    return this.formatToHtml(this.diffArray);
  }

  private formatToHtml(_array: any): string {
    let fmtHtml: string = '';
    for (let key in _array) {
      fmtHtml += '<li>' + key + '</li><ul>';
      for (let item of _array[key]) {
        fmtHtml += '<li>' + item + '</li>';
      }
      fmtHtml += '</ul>';
    }

    if ( fmtHtml === '' ) {
      return null;
    } else {
      return '<ul>' + fmtHtml + '</ul>';
    }
  }

  private detectChanges(jsonObj: any) {
    for (let obj of jsonObj) {
      this.diffArray[obj.key] = [];
      this.traverse(obj, obj.key);
    }
  }

  private traverse(jsonObj: any, key: string) {
    let objType: string = this.getTypeOfObj(jsonObj);
    if (objType === 'Object') {
      this.traverseObj(jsonObj, key);
    } else if (objType === 'Array') {
      for (let obj of jsonObj) {
        this.traverse(obj, key);
      }
    } else {
      console.log('Unknown JSON type: '+objType);
    }
  }

  private traverseObj(obj: any, key: string) {
    if (obj.changes) {
      for (let change of obj.changes) {
        this.traverse(change, key);
      }
    } else if ( !this.isEmpty(obj.value) ) {
      let change: string = obj.type + ': ' + obj.key;
      if (obj.type === this.UPDATE) {
        change += '(Old Value: ' + obj.oldValue + ', New Value:' + obj.value + ')';
      } else if (obj.type === this.REMOVE) {
        change += '(Old Value: ' + obj.value + ')';
      } else if (obj.type === this.ADD) {
        change += '(New Value: ' + obj.value + ')';
      } else {
        change += '(Value: ' + obj.value + ')';
      }
      this.diffArray[<any>key].push(change);
    }
  }

  private getTypeOfObj(obj: any): string {
    if (typeof obj === 'undefined') {
      return 'undefined';
    } else if (obj === null) {
      return null;
    }
    return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1];
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

  private compare(oldObj: any, newObj: any, path: any): any {
    let changes: any = [];
    let typeOfOldObj: any = this.getTypeOfObj(oldObj);
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
    let changes: any = [];
    let oldObjKeys: any = Object.keys(oldObj);
    let newObjKeys: any = Object.keys(newObj);
    let intersectionKeys: any = this.lodash.intersection(oldObjKeys, newObjKeys);
    for (let k of intersectionKeys) {
      let newPath: any = skipPath ? path : path.concat([k]);
      let diffs: any = this.compare(oldObj[k], newObj[k], newPath);
      if (diffs.length > 0) {
        changes = changes.concat(diffs);
      }
    }

    let addedKeys: any = this.lodash.difference(newObjKeys, oldObjKeys);
    for (let k of addedKeys) {
      let newPath: any = skipPath ? path : path.concat([k]);
      changes.push({
        type: this.ADD,
        key: this.getKey(newPath),
        value: newObj[k]
      });
    }

    // part of the path has been removed - won't happen in our application
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
    let oldType: string = this.getTypeOfObj(oldObj);
    let newType: string = this.getTypeOfObj(newObj);
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
    let objType: string = this.getTypeOfObj(obj);
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
}
