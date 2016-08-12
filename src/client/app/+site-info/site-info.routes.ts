import { RouterConfig } from '@angular/router';

import { SiteInfoComponent } from './index';

export const SiteInfoRoutes: RouterConfig = [
  {
    path: 'siteInfo/:id',
    component: SiteInfoComponent
  },
];
