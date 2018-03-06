
// export let _REGION = "us-east-1";

// export let _IDENTITY_POOL_ID = "us-east-1:688daf8f-a234-423e-9222-4d489c796834";
// export let _USER_POOL_ID = "us-east-1_bybDCnVM9";
// export let _CLIENT_ID = "3hl0eo4321kv7i3i2amqa8k8jf";

// export let _POOL_DATA = {
//     UserPoolId: _USER_POOL_ID,
//     ClientId: _CLIENT_ID
// };

import { Injectable } from '@angular/core';
import { Config } from '../config/env.config';

@Injectable()
export class AuthConstantsConfig {
    private region: string = Config.WEB_SERVICE_URL;
    private userPoolId: string = Config.WFS_GEOSERVER_URL;
    private clientId: string = Config.OPENAM_SERVER_URL;

    public getRegion(): string {
        return this.region;
    }

    public getUserPoolId(): string {
        return this.userPoolId;
    }

    public getClientId(): string {
        return this.clientId;
    }    
}	