import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserAuthService } from '../global/user-auth.service';
import { User } from 'oidc-client';
import { SiteLogService, ApplicationState } from '../site-log/site-log.service';
import { Subject } from 'rxjs/Subject';
import { AbstractBaseComponent } from '../abstract-groups-items/abstract-base.component';
import { ConstantsService } from '../global/constants.service';
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
export class StatusInfoComponent extends AbstractBaseComponent implements OnInit, OnDestroy {

    @Input() public siteId: string;

    public user: User | null = null;
    public isFormModified: boolean = false;
    public isFormInvalid: boolean = false;
    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private userAuthService: UserAuthService,
        private constantsService: ConstantsService,
        private siteLogService: SiteLogService) {

        super(siteLogService);
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    ngOnInit(): void {
        this.setupSiteLogSubscription();
        this.setupAuthSubscription();
    }

    public isUserLoggedIn(): boolean {
        return !!this.user;
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

    public getSiteLogXmlLink(): string {
        return this.constantsService.getWebServiceURL()+
        `/siteLogs/search/findByFourCharacterId?id=${this.siteId}&format=geodesyml`;
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
        this.userAuthService.user
            .takeUntil(this.unsubscribe)
            .subscribe((u: User) => {
                this.user = u;
            });
    }
}
