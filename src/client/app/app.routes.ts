import { Routes } from '@angular/router';

import { SelectSiteRoutes } from './+select-site/index';
import { SiteInfoRoutes } from './+site-info/index';
import { AboutRoutes } from './+about/index';

export const routes: Routes = [
  ...SiteInfoRoutes,
  ...SelectSiteRoutes,
  ...AboutRoutes,
];
