import { Injectable, EventEmitter, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { UserManager, MetadataService, User } from 'oidc-client';
import * as lodash from 'lodash';
import { ConstantsService } from './constants.service';
import { Observable } from 'rxjs';

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
    public userLoadedEvent = new EventEmitter<User | null>();
    private userManager: UserManager;
    private currentUser: User | null = null;

    constructor(private http: Http, private router: Router, private constantsService: ConstantsService,
        @Inject('Window') private window: Window) {

        let left = this.window.screen.width / 2 - 500 / 2;
        let top = this.window.screen.height / 2 - 700 / 2;
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
            filterProtocolClaims: true,
            loadUserInfo: true
        });

        this.userManager.getUser()
            .then((user) => {
                if (user) {
                    this.currentUser = user;
                    this.userLoadedEvent.emit(user);
                }
            })
            .catch(console.log);

        this.addEventHandlers();
    }

  requestNewUser(registration: UserRegistration): Observable<void> {
        return this.http.post(this.constantsService.getWebServiceURL() + '/userRegistrations', registration)
            .mapTo(undefined);
    }

    login() {
        this.userManager.signinRedirect().catch(console.log);
    }

    logout() {
        let id_token = this.currentUser.id_token;
        this.userManager.removeUser().then(() => {
            this.userManager.createSignoutRequest({ id_token_hint: id_token }).then((request: any) => {
                this.http.get(request.url).toPromise().catch(console.log);
            });
        });
    }

    getUser(): User | null {
      return this.currentUser;
    }

    changePassword() {
        if(this.currentUser) {
            let url: string = this.constantsService.getOpenAMServerURL() + '/XUI/#profile/password';
            window.open(url);
        }
    }

    public hasAuthorityToEditSite(siteId?: string): boolean {
        if (!siteId) {
            siteId = this.router.routerState.snapshot.root.children[0].url[1].path;
        }
        return this.hasAuthority('edit-' + siteId.toLowerCase());
    }

    public hasAuthority(authority: string): boolean {
        if (!this.currentUser || !authority) {
            return false;
        } else if (!this.currentUser.profile || !this.currentUser.profile.authorities) {
            return false;
        } else {
            return lodash.some(this.currentUser.profile.authorities, function(myAuthority) {
                return myAuthority === 'superuser' || myAuthority === authority;
            });
        }
    }

    public getAuthorisedSites(): string {
        if (!this.currentUser || !this.currentUser.profile || !this.currentUser.profile.authorities) {
            return '';
        }

        let authorizedSites: any = [];
        for (let auth of this.currentUser.profile.authorities) {
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
            this.currentUser = null;
            this.userLoadedEvent.emit(null);
        });
        this.userManager.events.addUserLoaded((user: User) => {
            this.currentUser = user;
            this.userLoadedEvent.emit(user);
        });
        this.userManager.events.addSilentRenewError(() => {
            this.userManager.removeUser();
            this.userManager.signinPopup().catch(console.log);
        });
    }
}
