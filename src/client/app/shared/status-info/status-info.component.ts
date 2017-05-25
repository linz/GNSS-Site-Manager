import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute, Params } from '@angular/router';
import { UserAuthService } from '../global/user-auth.service';
import { User } from 'oidc-client';
import { SiteLogService, ApplicationState } from '../site-log/site-log.service';

/**
 * This class represents the status information component which shows the status of user login and roles, selected site,
 * and validity / modification of the input form.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-status-info',
    templateUrl: 'status-info.component.html',
    styleUrls: ['status-info.component.css']
})
export class StatusInfoComponent implements OnInit {
    public siteId: string;
    public user: User | null = null;
    public isFormModified: boolean = false;
    public isFormInvalid: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userAuthService: UserAuthService,
        private siteLogService: SiteLogService) {
    }

    ngOnInit(): void {
        this.setupRouterSubscription();
        this.setupSiteLogSubscription();
        this.setupAuthSubscription();
    }

    public isAuthorisedSite(): boolean {
        return this.userAuthService.hasAuthorityToEditSite(this.siteId);
    }

    public getFormStatus(): string {
        let formStatus: string = '';
        if (this.isFormModified) {
            formStatus = 'modified';
        }

        if (this.isFormInvalid) {
            formStatus += (formStatus ? ' and ' : '') + 'invalid';
        }
        return (formStatus ? 'The form is ' + formStatus + '.' : '');
    }

    public getAuthorisedSites(): string {
        return this.userAuthService.getAuthorisedSites();
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
        this.userAuthService.userLoadedEvent.subscribe((u: User) => {
            this.user = u;
        });
    }
}
