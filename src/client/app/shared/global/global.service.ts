import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
    public selectedSiteId: string = '';
    public isRunning: boolean = false;
    private statusText: string = '';

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

    public setSelectedSiteId(value: string) {
        this.selectedSiteId = value;
    }

    public getSelectedSiteId(): string {
        return this.selectedSiteId;
    }

    public startRunning() {
        this.isRunning = true;
    }

    public stopRunning() {
        this.isRunning = false;
    }

    setRunningStatus(value: boolean) {
        this.isRunning = value;
    }

    public getRunningStatus(): boolean {
        return this.isRunning;
    }

    public setStatusText(status:string) {
        this.statusText = status;
    }

    public getStatusText() {
        return this.statusText;
    }
}
