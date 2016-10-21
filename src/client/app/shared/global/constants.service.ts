import { Injectable } from '@angular/core';
import { Config } from '../config/env.config';

@Injectable()
export class ConstantsService {
    private webServiceURL: string = Config.WEB_SERVICE_URL;
    private wfsGeoserverURL: string = Config.WFS_GEOSERVER_URL;


    public getWebServiceURL(): string {
        return this.webServiceURL;
    }

    public getWFSGeoserverURL(): string {
        return this.wfsGeoserverURL;
    }
}
