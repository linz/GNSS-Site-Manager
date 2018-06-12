import { Injectable } from '@angular/core';
import { Config } from '../config/env.config';

@Injectable()
export class ConstantsService {
    // Constant variables used in ResponsibleParty and SiteInfo components
    public static readonly SITE_CONTACT = 'Site Contact';
    public static readonly SITE_METADATA_CUSTODIAN = 'Site Metadata Custodian';
    public static readonly SITE_DATA_CENTER = 'Site Data Center';
    public static readonly SITE_DATA_SOURCE = 'Site Data Source';

    private webServiceURL: string = Config.WEB_SERVICE_URL;
    private wfsGeoserverURL: string = Config.WFS_GEOSERVER_URL;

    private authorizerURL: string =
        `https://cognito-idp.${Config.AWS_REGION}.amazonaws.com/${Config.CGN_POOL_ID}`;
    private clientURL: string = Config.CLIENT_URL;

    public getWebServiceURL(): string {
        return this.webServiceURL;
    }

    public getWFSGeoserverURL(): string {
        return this.wfsGeoserverURL;
    }

    public getClientURL(): string {
        return this.clientURL;
    }

    public getAuthorizerURL(): string {
        return this.authorizerURL;
    }

    public getHostedURL(): string {
        return Config.CGN_HOST_URL;
    }

    public getClientId(): string {
        return Config.CGN_CLIENT_ID;
    }
}
