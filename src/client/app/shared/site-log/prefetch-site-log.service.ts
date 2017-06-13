import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { SiteLogViewModel } from '../json-data-view-model/view-model/site-log-view-model';
import { ConstantsService } from '../global/constants.service';
import { JsonixService } from '../jsonix/jsonix.service';
import { JsonViewModelService } from '../json-data-view-model/json-view-model.service';

@Injectable()
export class PrefetchSiteLogResolver implements Resolve<SiteLogViewModel> {

    constructor(private router: Router,
                private http: Http,
                private constantsService: ConstantsService,
                private jsonixService: JsonixService,
                private jsonViewModelService: JsonViewModelService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<SiteLogViewModel> {
        let homeUrl: string = '';
        let fourCharacterId: string = route.params['id'];
        if (!fourCharacterId) {
            this.router.navigate([homeUrl]);
            return null;
        } else if (fourCharacterId === 'newSite') {
            return Promise.resolve(new SiteLogViewModel());
        }

        return this.http.get(this.constantsService.getWebServiceURL()
                 + '/siteLogs/search/findByFourCharacterId?id=' + fourCharacterId + '&format=geodesyml')
            .toPromise().then((result: any) => {
                var geodesyMl: any = result.text();
                let json: string = this.jsonixService.geodesyMLToJson(geodesyMl);
                let siteLogViewModel: SiteLogViewModel = this.jsonViewModelService.dataModelToViewModel(json);
                return siteLogViewModel;
            })
            .catch((error: any) => {
                console.log(error);
                this.router.navigate([homeUrl]);
                return null;
            });
    }
}
