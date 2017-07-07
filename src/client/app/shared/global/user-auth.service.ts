import { Injectable, Inject, NgZone } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { UserManager, User } from 'oidc-client';
import { ConstantsService } from './constants.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
        this.ngZone.runOutsideAngular(() => {
            this.userManager = new UserManager({
                authority: this.constantsService.getOpenAMServerURL() + '/oauth2',
                client_id: 'GnssSiteManager',
                response_type: 'id_token token',
                redirect_uri: this.constantsService.getClientURL() + '/auth.html',
                post_logout_redirect_uri: this.constantsService.getClientURL(),
                scope: 'openid profile',
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
        let id_token = this.user.value.id_token;
        this.userManager.removeUser().then(() => {
            this.userManager.createSignoutRequest({ id_token_hint: id_token }).then((request: any) => {
                this.http.get(request.url).toPromise().catch(console.log);
            });
        });
    }

    changePassword() {
        if(this.user.value) {
            let url: string = this.constantsService.getOpenAMServerURL() + '/XUI/#profile/password';
            window.open(url);
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
        if (!this.user.value || !this.user.value.profile || !this.user.value.profile.authorities) {
            return '';
        }

        let authorizedSites: any = [];
        for (let auth of this.user.value.profile.authorities) {
            auth = auth.toLowerCase();
            if (auth === 'superuser') {
                return 'All sites';
            } else if (auth.startsWith('edit-')) {
                authorizedSites.push(auth.slice(5).toUpperCase());
            }
        }
        return authorizedSites.join();
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
