import {Injectable} from '@angular/core';

@Injectable()
export class GlobalService {
    public selectedSiteId: string = '';
    public isRunning: boolean = false;
    private webServiceURL: string = 'http://localhost:8080/geodesy-web-services';

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
}
