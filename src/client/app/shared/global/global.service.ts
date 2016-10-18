import { Injectable } from '@angular/core';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { Config } from '../config/env.config';

@Injectable()
export class GlobalService {
    public selectedSiteId: string = '';
    public isRunning: boolean = false;
    private statusText: string = '';

    private webServiceURL: string = Config.WEB_SERVICE_URL;
    private wfsGeoserverURL: string = Config.WFS_GEOSERVER_URL;

    public static handleData(response: Response) {
        return response.json();
    }

    public static handleDataDebug(response: Response) {
        let data: any = response.json();
        console.debug('handleDataDebug: ', data);
        return data;
    }

    /**
     * Handle HTTP error
     */
    public static handleError(error: any): ErrorObservable {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        errMsg += error.stack;
        console.error(errMsg);
        return Observable.throw(error.json().error || 'Server error');
    }

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

    public getWebServiceURL(): string {
        return this.webServiceURL;
    }

    public getWFSGeoserverURL(): string {
        return this.wfsGeoserverURL;
    }

    public setStatusText(status:string) {
        this.statusText = status;
    }

    public getStatusText() {
        return this.statusText;
    }
}
