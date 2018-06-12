import { Injectable, Inject, NgZone } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { UserManager, User } from 'oidc-client';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ConstantsService } from './constants.service';

// import { Log } from 'oidc-client';
// Log.logger = console;
// Log.level = Log.DEBUG;

export class UserRegistration {
    constructor(
        readonly firstName: string,
        readonly lastName: string,
        readonly organisation: string,
        readonly position: string,
        readonly email : string,
        readonly phone : string,
        readonly remarks: string,
      ) {}
}

/**
 * Service for authentication and authorisation of subjects.
 */
@Injectable()
export class UserAuthService {
    public user = new BehaviorSubject<User | null>(null);
    private userManager: UserManager;

    constructor(private ngZone: NgZone, private http: Http, private router: Router, private constantsService: ConstantsService,
        @Inject('Window') private window: Window) {

        let left = this.window.screen.width / 2 - 500 / 2;
        let top = this.window.screen.height / 2 - 700 / 2;
        // debugger;

        this.ngZone.runOutsideAngular(() => {
            this.userManager = new UserManager({
                authority: this.constantsService.getAuthorizerURL(),
                client_id: this.constantsService.getClientId(),
                response_type: 'token id_token',
                redirect_uri: this.constantsService.getClientURL() + '/auth.html',
                post_logout_redirect_uri: this.constantsService.getClientURL(),
                // scope: 'openid profile',
                scope: 'openid profile aws.cognito.signin.user.admin',
                silent_redirect_uri: this.constantsService.getClientURL() + '/auth.html?silent',
                popup_redirect_uri: this.constantsService.getClientURL() + '/auth.html?popup',
                popupWindowFeatures: `location=no,toolbar=no,width=500,height=700,left=${left},top=${top}`,
                accessTokenExpiringNotificationTime: 60,
                automaticSilentRenew: true,
                monitorSession: false,
                filterProtocolClaims: true,
                loadUserInfo: true
            });

            this.userManager.getUser()
                .then((user) => {
                    if (user) {
                        user.profile.sub = user.profile['cognito:username'];
                        this.user.next(user);
                    }
                })
                .catch(console.log);

            this.addEventHandlers();
        });
    }

    requestNewUser(registration: UserRegistration): Observable<void> {
        return this.http.post(this.constantsService.getWebServiceURL() + '/userRegistrations', registration)
            .mapTo(undefined);
    }

    login() {
        this.userManager.signinRedirect().catch(console.log);
    }

    logout() {
        let id_token = this.user.value.access_token;

        this.userManager.removeUser().then(() => {
            this.userManager.createSignoutRequest(
                {
                    id_token_hint: id_token,
                    data: {}
                }
                ).then((request: any) => {
                    // debugger;
                this.deleteAllCookies();
                this.clearState();
                console.log(this.constantsService.getHostedURL() +'/logout?response_type=token&logout_uri='
                          + this.constantsService.getClientURL() +'&state=STATE&client_id='
                          + this.constantsService.getClientId());

                window.location.href = this.constantsService.getHostedURL() +'/logout?response_type=token&logout_uri='
                                      + this.constantsService.getClientURL() +'&state=STATE&client_id='
                                      + this.constantsService.getClientId();
            });
        });
    }

    getUserSignUpUrl(): string {
        return this.constantsService.getHostedURL() +'/signup?response_type=token&client_id='
        + this.constantsService.getClientId() + '&redirect_uri=' + this.constantsService.getClientURL() + '/auth.html';
    }

    clearState() {
        this.userManager.clearStaleState().then(function(){
            console.log('clearStateState success');
            localStorage.clear();
        }).catch(function(e){
            console.log('clearStateState error', e.message);
        });

    }

    deleteAllCookies() {
        var cookies = document.cookie.split(';');

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf('=');
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
    }

    switchUser() {
        if(this.user.value) {
            // let url: string = this.constantsService.getLogoutURL();
            // window.open(url);
            window.location.href = this.constantsService.getHostedURL() +'/login?response_type=token&redirect_uri='
                                 + this.constantsService.getClientURL() +'/auth.html&state=STATE&client_id='
                                 + this.constantsService.getClientId();
        }
    }

    public hasAuthorityToEditSite(siteId: string): Observable<boolean> {
        if (!this.user.value || !siteId) {
            return Observable.of(false);
        }
        if ('newSite' === siteId) {
            return Observable.of(true);
        }
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.user.value.id_token);

        return this.http.get(this.constantsService.getWebServiceURL() + '/siteLogs/isAuthorisedToUpload?fourCharacterId=' + siteId,
            { headers: headers })
            .map((_response: any) => true)
            .catch((error: any) => {
                if (error.status === 401 || error.status === 403) {
                    return Observable.of(false);
                } else {
                    return Observable.throw(error);
                }
            });
    }

    public getAuthorisedSites(): string {
        if (!this.user.value || !this.user.value.profile ) {
            return '';
        }

        let authorizedSites: any = [];

        if ( ((typeof this.user.value.profile['custom:sitelog'] !== 'undefined')
                && (this.user.value.profile['custom:sitelog'] !== null))) {
            for (let auth of this.user.value.profile['custom:sitelog'].split(',')) {
                if (auth === 'superuser') {
                    return 'All sites';
                } else if (!auth.startsWith('edit-network:') && auth.length >= 4 ) {
                    authorizedSites.push(auth);
                }
            }

        }

        return authorizedSites.join(', ');
    }

    private addEventHandlers() {
        this.userManager.events.addUserUnloaded(() => {
            this.user.next(null);
        });
        this.userManager.events.addUserLoaded((user: User) => {
            this.user.next(user);
        });
        this.userManager.events.addSilentRenewError(() => {
            this.userManager.removeUser();
            this.userManager.signinPopup().catch(console.log);
        });
    }
}
