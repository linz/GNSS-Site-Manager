import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiceWorkerService, DialogService } from '../index';
import { UserAuthService } from '../global/user-auth.service';
import { User } from 'oidc-client';
import { SiteLogService, ApplicationState } from '../site-log/site-log.service';

/**
 * This class represents the toolbar component which is the header of all UI pages.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
    public siteId: string;
    public user: User | null = null;
    @Output() onSave: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onRevert: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

    private serviceWorkerSubscription: Subscription;
    private cacheItems: Array<string> = [];

    private loadedUserSub: any;
    private isFormModified: boolean;
    private isFormInvalid: boolean;

    constructor(private serviceWorkerService: ServiceWorkerService,
        private route: ActivatedRoute,
        private router: Router,
        private userAuthService: UserAuthService,
        private siteLogService: SiteLogService,
        private dialogService: DialogService) {
    }

    ngOnInit(): void {
        this.setupSubscriptions();
        this.updateCacheList();
    }

    save(): void {
        this.onSave.emit(this.siteId !== null);
    }

    revert(): void {
        this.onRevert.emit(this.siteId !== null);
    }

    close(): void {
        this.onClose.emit(this.siteId !== null);
    }

    public isFormDirty(): boolean {
        return this.isFormModified;
    }

    public isSiteLogFormInvalid(): boolean {
        return this.isFormInvalid;
    }

    /**
     * Component method to request the Service Worker clears it's cache.
     */
    clearCache(): void {
        this.serviceWorkerService.clearCache().then((data: string) => {
            console.debug('toolbar.component clearCacheObservable() success: ', data);
            self.location.reload();
        }, (error: Error) => {
            throw new Error('Error in clearCacheObservable: ' + error.message);
        });
    }

    updateCacheList(): void {
        this.serviceWorkerService.getCacheList().then((data: string[]) => {
            this.cacheItems.length = 0;
            this.cacheItems = data;
        }).catch((error: any) => {
            console.error('Caught error in updateCacheList:', error);
        });
    }

    login(): void {
        this.userAuthService.login();
    }

    logout(): void {
        this.userAuthService.logout();
    }

    showUserProfile(): void {
        let userProfile: string = '<div class="title">User Profile</div>'
            + '<div class="profile-table"><table>'
            + '<tr><td class="name">User Name</td><td class="value">' + this.user.profile.sub + '</td></tr>'
            + '<tr><td class="name">Full Name</td><td class="value">' + this.user.profile.name + '</td></tr>'
            + '<tr><td class="name">Last Name</td><td class="value">' + this.user.profile.family_name + '</td></tr>'
            + '<tr><td class="name">Authorised Sites</td><td class="value">' + this.getAuthorisedSites() + '</td></tr>'
            +'</table></div>';
        this.dialogService.showAlertDialog(userProfile);
    }

    changePassword(): void {
        this.userAuthService.changePassword();
    }

    private setupSubscriptions(): void {
        this.setupServiceWorkerSubscription();
        this.setupRouterSubscription();
        this.setupAuthSubscription();
        this.setupSiteLogSubscription();
    }

    private setupServiceWorkerSubscription(): void {
        this.serviceWorkerSubscription = this.serviceWorkerService.clearCacheObservable.subscribe((isCacheChanged: boolean) => {
            if (isCacheChanged) {
                this.updateCacheList();
            }
        });
    }

    private setupRouterSubscription(): void {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(event => {
                let currentRoute: ActivatedRoute = this.route.root;
                while (currentRoute.children[0] !== undefined) {
                    currentRoute = currentRoute.children[0];
                }
                currentRoute.params.subscribe((param: Params) => {
                    let obj: {id: string} = <any> param.valueOf();
                    this.siteId = obj.id;
                });
            });
    }

    private setupSiteLogSubscription(): void {
        this.siteLogService.getApplicationStateSubscription().subscribe((applicationState: ApplicationState) => {
            this.isFormModified = applicationState.applicationFormModified;
            this.isFormInvalid = applicationState.applicationFormInvalid;
        });
    }

    private setupAuthSubscription(): void {
        this.loadedUserSub = this.userAuthService.userLoadedEvent.subscribe((u: User) => {
            this.user = u;
        });
    }

    private getAuthorisedSites(): string {
        return this.userAuthService.getAuthorisedSites();
    }
}
