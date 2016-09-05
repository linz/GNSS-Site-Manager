import { Route } from '@angular/router';

import { SiteInfoComponent } from './index';

export const SiteInfoRoutes: Route[] = [
  {
    path: 'siteInfo/:id',
    component: SiteInfoComponent
  },
];
