import { Injectable } from '@angular/core';

@Injectable()
export class MiscUtilsService {
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
   * Display the element block clicked in full-view on the page and return a flag for switching block open/hide option.
   */
  public scrollIntoView(event: any, isBlockOpen: boolean): boolean {
    isBlockOpen = !isBlockOpen;
    if(isBlockOpen && event && event.target) {
      setTimeout(function() {
        event.target.scrollIntoView();
      }, 10);
    }

    return isBlockOpen;
  }

  /**
   * Display the element block clicked in full-view on the page.
   */
  public showFullView(event: any) {
    if(event && event.target) {
      setTimeout(function() {
        event.target.scrollIntoView();
      }, 10);
    }
  }
}
