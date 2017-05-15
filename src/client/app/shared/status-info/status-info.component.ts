import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute, Params } from '@angular/router';
import { UserAuthService } from '../global/user-auth.service';
import { User } from 'oidc-client';
import { SiteLogService } from '../site-log/site-log.service';

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
        this.siteLogService.getIsFormModifiedSubscription().subscribe((isModified: boolean) => {
            this.isFormModified = isModified;
        });
    }

    private setupAuthSubscription(): void {
        this.userAuthService.userLoadededEvent.subscribe((u: User) => {
            this.user = u;
        });
    }

    private getUserAuthorityString(): string {
        let authorities: any = [];
        for (let auth of this.user.profile.authorities) {
            auth = auth.toLowerCase();
            if (auth === 'superuser') {
                return 'All sites';
            } else if (auth.startsWith('edit-')) {
                authorities.push(auth.slice(5).toUpperCase());
            }
        }
        return authorities.join();
    }
}
