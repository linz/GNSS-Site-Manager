import { Injectable } from '@angular/core';

@Injectable()
export class JsonDiffService {
  private changeSets: any = require('diff-json');
  private diffArray: Array<any>;

  constructor() {
    this.diffArray = [];
  }

  public getDiff(oldJson: any , newJson: any): string {
    this.diffArray = [];
    let diffJson: any = this.changeSets.diff(oldJson, newJson);
    console.log(diffJson);
    this.traverse(diffJson);
    let diffHtml: string = '';
    for (let diff of this.diffArray) {
      diffHtml += '<li>'+diff+'</li>'
    }
    return '<ol>'+diffHtml+'</ol>';
  }

  private traverse(jsonObj: any) {
    switch ( this.getTypeOfObj(jsonObj) ) {
      case 'Date':
        console.log(jsonObj);
        break;
      case 'Object':
        this.traverseObject(jsonObj);
        break;
      case 'Array':
        for (let obj of jsonObj) {
          this.traverse(obj);
        }
        break;
      case 'Function':
        break;
      default:
        console.log(jsonObj);
    }
  }

  private traverseObject(obj: any) {
    if (obj.changes) {
      for (let change of obj.changes) {
        this.traverse(change);
      }
    } else if (obj.value) {
      if (obj.type === 'update') {
        let updateField: string = 'Updated: ' + obj.key + '(Old Value: ' + obj.oldValue + ', New Value:' + obj.value + ')';
        this.diffArray.push(updateField);
      } else if (obj.type === 'remove') {
        let removeField: string = obj.type + 'Removed: ' + obj.key + '(Value: ' + obj.value + ')';
        this.diffArray.push(removeField);
      } else {
        let addField: string = obj.type + 'Added: ' + obj.key + '(Value: ' + obj.value + ')';
        this.diffArray.push(addField);
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
  };
}
