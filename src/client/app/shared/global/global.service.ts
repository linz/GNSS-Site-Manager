import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
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
}
