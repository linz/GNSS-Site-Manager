import { Injectable } from '@angular/core';

@Injectable()
export class JsonDiffService {
  private diffJson = require('diff-json');
  private diffArray: Array<any>;

  constructor() {
    this.diffArray = [];
  }

  public getJsonDiffHtml(oldJson: any , newJson: any): string {
    this.diffArray = [];
    let jsonDiff: any = this.diffJson.diff(oldJson, newJson);
    console.log(jsonDiff);
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
    if ( !fmtHtml ) {
      fmtHtml += '<ul>' + fmtHtml + '</ul>';
    }
    return fmtHtml;
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
      console.log(jsonObj);
    }
  }

  private traverseObj(obj: any, key: string) {
    if (obj.changes) {
      for (let change of obj.changes) {
        this.traverse(change, key);
      }
    } else if (obj.value) {
      console.log('Key: ' + obj.key);
      if (obj.type === 'update') {
        let updateField: string = 'Updated: ' + obj.key + '(Old Value: ' + obj.oldValue + ', New Value:' + obj.value + ')';
        this.diffArray[<any>key].push(updateField);
      } else if (obj.type === 'remove') {
        let removeField: string = 'Removed: ' + obj.key + '(Value: ' + obj.value + ')';
        this.diffArray[<any>key].push(removeField);
      } else if (obj.type === 'add') {
        let addField: string = 'Added: ' + obj.key + '(Value: ' + obj.value + ')';
        this.diffArray[<any>key].push(addField);
      } else {
        let addField: string = obj.type + ': ' + obj.key + '(Value: ' + obj.value + ')';
        this.diffArray[<any>key].push(addField);
      }
    }
  }

  private getTypeOfObj(obj: any): string {
    if (typeof obj === 'undefined') {
      return 'undefined';
    }
    if (obj === null) {
      return null;
    }
    return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1];
  }
}
