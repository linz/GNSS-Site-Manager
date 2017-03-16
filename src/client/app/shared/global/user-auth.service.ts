import { Injectable, EventEmitter } from '@angular/core';
import { UserManager, MetadataService, User } from 'oidc-client';
import * as lodash from 'lodash';
import { ConstantsService } from './constants.service';

/**
 * Service for authentication and authorisation of subjects.
 */
@Injectable()
export class UserAuthService {
    public userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();
    private userManager: UserManager;
    private currentUser: User;

    constructor(private constantsService: ConstantsService) {
        this.userManager = new UserManager({
            authority: this.constantsService.getOpenAMServerURL() + '/oauth2',
            client_id: 'GnssSiteManager',
            redirect_uri: this.constantsService.getClientURL() + '/auth.html',
            post_logout_redirect_uri: this.constantsService.getClientURL(),
            scope: 'openid profile',
            silent_redirect_uri: this.constantsService.getClientURL() + '/renew',
            automaticSilentRenew: true,
            filterProtocolClaims: true,
            loadUserInfo: true
        });

        this.userManager.getUser()
            .then((user) => {
                if (user) {
                    this.currentUser = user;
                    this.userLoadededEvent.emit(user);
                } else {
                    this.currentUser = null;
                }
            })
            .catch((err) => {
                console.log(err);
                this.currentUser = null;
            });

        this.addEventHandlers();
    }

    login() {
        this.userManager.signinRedirect().then(() => {
            console.log('UserAuthService - signinRedirect done');
        }).catch((err) => {
            console.log('UserAuthService - signinRedirect error');
            console.log(err);
        });
    }

    logout() {
        this.userManager.signoutRedirect().then((res) => {
            console.log('UserAuthService - signed out', res);
        }).catch((err) => {
            console.log('UserAuthService - signoutRedirect error');
            console.log(err);
        });
    };

    getUser(): User | null {
      return this.currentUser;
    }

    public hasAuthorityToEditSite(siteId: string): boolean {
        return this.hasAuthortiy('edit-' + siteId.toLowerCase());
    }

    public hasAuthortiy(authority: string): boolean {
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

    private addEventHandlers() {
        this.userManager.events.addUserUnloaded((e) => {
            console.log('User logged out: ', e);
            this.currentUser = null;
        });
        this.userManager.events.addUserLoaded((e) => {
            console.log('User logged in: ', e);
        });
    }
}
