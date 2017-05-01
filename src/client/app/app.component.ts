import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Config, CorsSiteService, CorsSetupService, SiteLogService, DialogService, MiscUtils,
         JsonDiffService, JsonCheckService, JsonPointerService, ServiceWorkerService,
         JsonixService } from './shared/index';
import { SiteInfoComponent } from './site-info/site-info.component';
import { JsonViewModelService } from './shared/json-data-view-model/json-view-model.service';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (SelectSiteComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  viewProviders: [
    CorsSiteService,
    CorsSetupService,
    DialogService,
    MiscUtils,
    JsonixService,
    ServiceWorkerService,
    SiteLogService,
    SiteInfoComponent,
    JsonDiffService,
    JsonCheckService,
    JsonPointerService,
    JsonViewModelService,
  ],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  constructor(private siteInfo: SiteInfoComponent, private viewContainerRef: ViewContainerRef, private router: Router) {
    console.log('Environment config', Config);
  }

  /**
   * Invoke the save() method of SiteInfo component triggered by the "Save" button on Toolbar component
   *
   * @event: boolean - true if the selected siteId is not null
   */
  onSave(event: any) {
    if (event) {
      this.siteInfo.save(null);
    }
  }

  /**
   * Invoke the loadSiteInfoData() method of SiteInfo c triggered by the "Revert" button on Toolbar component
   *
   * @event: boolean - true if the selected siteId is not null
   */
  onRevert(event: any) {
    if (event) {
      this.siteInfo.loadSiteInfoData();
    }
  }

  /**
   * Invoke the goToHomePage() method of SiteInfo component triggered by the "Close" button on Toolbar component
   *
   * @event: boolean - true if the selected siteId is not null
   */
  onClose(event: any) {
    if (event) {
      this.siteInfo.goToHomePage();
    }
  }

  onActivate(event: any) {
    this.siteInfo = event;
    localStorage.setItem('routerUrl', this.router.url);
  }
}
