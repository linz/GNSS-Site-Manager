import { Component, ViewContainerRef } from '@angular/core';
import { Config, CorsSiteService, CorsSetupService, SiteLogService, DialogService, MiscUtilsService,
          JsonDiffService, NameListService, ServiceWorkerService, JsonixService } from './shared/index';
import { SiteInfoComponent } from './site-info/site-info.component';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, SelectSiteComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  viewProviders: [
    CorsSiteService,
    CorsSetupService,
    DialogService,
    MiscUtilsService,
    JsonixService,
    NameListService,
    ServiceWorkerService,
    SiteLogService,
    SiteInfoComponent,
    JsonDiffService,
  ],
  templateUrl: 'app.component.html',
})

export class AppComponent {
  constructor(private siteInfo: SiteInfoComponent, private viewContainerRef: ViewContainerRef) {
    console.log('Environment config', Config);
  }

  onSave(siteLogJson: any) {
    this.siteInfo.save(null);
  }

  onActivate(a: any) {
    this.siteInfo = a;
  }
}
