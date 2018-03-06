import { Injectable } from "@angular/core";

import { Config } from '../config/env.config';
// import { CognitoIdentityCredentials} from "aws-sdk";
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import * as AWS from "aws-sdk/global";
import AWSK from "aws-sdk";
import AWSCognito from 'amazon-cognito-identity-js';


// CognitoIdentityServiceProvider
// import { AWSCognito } from "aws-sdk/lib/service";
// import * as awsservice from "aws-sdk/lib/service";
// import CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider';


/**
 * Created by Vladimir Budilov
 */

// const SingleuserPool = new CognitoUserPool({
//   UserPoolId: 'ap-southeast-2_q0oHPJ0N5',
//   ClientId: '4hpg5n34kduiedr7taqipdo77h',
// });

export interface CognitoCallback {
    cognitoCallback(message: string, result: any): void;

}

export interface LoggedInCallback {
    isLoggedIn(message: string, loggedIn: boolean): void;
}

export interface ChallengeParameters {
    CODE_DELIVERY_DELIVERY_MEDIUM: string;

    CODE_DELIVERY_DESTINATION: string;
}

export interface Callback {
    callback(): void;

    callbackWithParam(result: any): void;
}

// @Injectable()
// export class CognitoUtil {

//     public static _REGION = Config.AWS_REGION;

//     // public static _IDENTITY_POOL_ID = environment.identityPoolId;
//     public static _USER_POOL_ID = Config.CGN_POOL_ID;
//     public static _CLIENT_ID = Config.CGN_CLIENT_ID;

//     public static _POOL_DATA: any = {
//         UserPoolId: CognitoUtil._USER_POOL_ID,
//         ClientId: CognitoUtil._CLIENT_ID
//     };

//     // public cognitoCreds: AWS.CognitoIdentityCredentials;

//     getUserPool() {
//         debugger;
//         // return SingleuserPool;
//         return new AWSCognito.CognitoUserPool(CognitoUtil._POOL_DATA);
//         // return new CognitoUserPool(CognitoUtil._POOL_DATA);
//     }

//     getCurrentUser() {
//         return this.getUserPool().getCurrentUser();
//     }

//     getAccessToken(callback: Callback): void {
//         if (callback == null) {
//             throw("CognitoUtil: callback in getAccessToken is null...returning");
//         }
//         if (this.getCurrentUser() != null) {
//             this.getCurrentUser().getSession(function (err:any, session:any) {
//                 if (err) {
//                     console.log("CognitoUtil: Can't set the credentials:" + err);
//                     callback.callbackWithParam(null);
//                 }
//                 else {
//                     if (session.isValid()) {
//                         callback.callbackWithParam(session.getAccessToken().getJwtToken());
//                     }
//                 }
//             });
//         }
//         else {
//             callback.callbackWithParam(null);
//         }
//     }

//     getIdToken(callback: Callback): void {
//         if (callback == null) {
//             throw("CognitoUtil: callback in getIdToken is null...returning");
//         }
//         if (this.getCurrentUser() != null)
//             this.getCurrentUser().getSession(function (err:any, session:any) {
//                 if (err) {
//                     console.log("CognitoUtil: Can't set the credentials:" + err);
//                     callback.callbackWithParam(null);
//                 }
//                 else {
//                     if (session.isValid()) {
//                         callback.callbackWithParam(session.getIdToken().getJwtToken());
//                     } else {
//                         console.log("CognitoUtil: Got the id token, but the session isn't valid");
//                     }
//                 }
//             });
//         else
//             callback.callbackWithParam(null);
//     }

//     getRefreshToken(callback: Callback): void {
//         if (callback == null) {
//             throw("CognitoUtil: callback in getRefreshToken is null...returning");
//         }
//         if (this.getCurrentUser() != null)
//             this.getCurrentUser().getSession(function (err:any, session:any) {
//                 if (err) {
//                     console.log("CognitoUtil: Can't set the credentials:" + err);
//                     callback.callbackWithParam(null);
//                 }

//                 else {
//                     if (session.isValid()) {
//                         callback.callbackWithParam(session.getRefreshToken());
//                     }
//                 }
//             });
//         else
//             callback.callbackWithParam(null);
//     }

//     refresh(): void {
//         this.getCurrentUser().getSession(function (err:any, session:any) {
//             if (err) {
//                 console.log("CognitoUtil: Can't set the credentials:" + err);
//             }

//             else {
//                 if (session.isValid()) {
//                     console.log("CognitoUtil: refreshed successfully");
//                 } else {
//                     console.log("CognitoUtil: refreshed but session is still not valid");
//                 }
//             }
//         });
//     }
// }
