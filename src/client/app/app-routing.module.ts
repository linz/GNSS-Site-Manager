import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SelectSiteRoutes } from './select-site/index';
import { SiteInfoRoutes } from './site-info/index';
import { AboutRoutes } from './about/index';

@NgModule({
  imports: [
    RouterModule.forRoot([
      /* define app module routes here, e.g., to lazily load a module
         (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
       */
      ...SiteInfoRoutes,
      ...SelectSiteRoutes,
      ...AboutRoutes,
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

