import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserAuthService } from '../global/user-auth.service';
import { User } from 'oidc-client';
import { SiteLogService, ApplicationState } from '../site-log/site-log.service';
import { Subject } from 'rxjs/Subject';

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
export class StatusInfoComponent implements OnInit, OnDestroy {

    @Input() public siteId: string;

    public user: User | null = null;
    public isFormModified: boolean = false;
    public isFormInvalid: boolean = false;
    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private userAuthService: UserAuthService,
        private siteLogService: SiteLogService) {
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    ngOnInit(): void {
        this.user = this.userAuthService.getUser();
        this.setupSiteLogSubscription();
        this.setupAuthSubscription();
    }

    public isUserLoggedIn(): boolean {
        return this.userAuthService.getUser() !== null;
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

    private setupSiteLogSubscription(): void {
        this.siteLogService.getApplicationState()
            .takeUntil(this.unsubscribe)
            .subscribe((applicationState: ApplicationState) => {
                this.isFormModified = applicationState.applicationFormModified;
                this.isFormInvalid = applicationState.applicationFormInvalid;
            });
    }

    private setupAuthSubscription(): void {
        this.userAuthService.userLoadedEvent
            .takeUntil(this.unsubscribe)
            .subscribe((u: User) => {
                this.user = u;
            });
    }
}
