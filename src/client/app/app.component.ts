import { Component } from '@angular/core';
import { Config, CorsSiteService, CorsSetupService, SiteLogService, GlobalService, NameListService,
          ServiceWorkerService, JsonixService } from './shared/index';
import { SiteInfoComponent } from './site-info/site-info.component';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, SelectSiteComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  viewProviders: [CorsSiteService, CorsSetupService, SiteLogService, GlobalService,
                  NameListService, ServiceWorkerService,
    JsonixService],
  templateUrl: 'app.component.html',
})

export class AppComponent {
  private siteInfo: SiteInfoComponent;
  constructor() {
    console.log('Environment config', Config);
  }

  onSave(siteLogJson: any) {
    this.siteInfo.save(null);
  }

  onActivate(a: any) {
    this.siteInfo = a;
  }
}
