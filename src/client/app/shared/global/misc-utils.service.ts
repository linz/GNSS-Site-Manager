import { Injectable } from '@angular/core';

@Injectable()
export class MiscUtilsService {

  private _scrollIntoView: any = require('scroll-into-view');
  private _settings: any = {time: 1000, align: {top: 0, left: 0}};

  /**
   * Get present date and time string in format of "yyyy-mm-ddThh:mm:ss.sssZ"
   */
  public getPresentDateTime() {
    return new Date().toISOString();
  }

  /**
   * Clone a JSON object from existing one so that both have no reference
   */
  public cloneJsonObj(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Return the type of the object obj
   */
  public getObjectType(obj: any): string {
    if (typeof obj === 'undefined') {
      return 'undefined';
    } else if (obj === null) {
      return null;
    }
    return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1];
  }

  /**
   * Scroll the element clicked into full-view on the page and return a flag for switching block open/hide option.
   */
  public scrollIntoView(event: any, isBlockOpen: boolean): boolean {
    isBlockOpen = !isBlockOpen;
    if(isBlockOpen && event && event.target) {
      this._scrollIntoView(event.target, this._settings);
    }

    return isBlockOpen;
  }

  /**
   * Scroll the element clicked into full-view on the page.
   */
  public showFullView(event: any) {
    event.preventDefault();
    if(event && event.target) {
      this._scrollIntoView(event.target, this._settings);
    }
  }

  /**
   * Scroll the element defined by Id into full-view on the page.
   */
  public showElemById(id: string) {
    let elem: any = document.getElementById(id);
    if (elem !== null) {
      this._scrollIntoView(elem, this._settings);
    }
  }
}
