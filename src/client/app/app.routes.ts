import { Routes } from '@angular/router';

import { AboutRoutes } from './+about/index';
import { SelectSiteRoutes } from './+select-site/index';
import { SiteInfoRoutes } from './+site-info/index';
import { HomeRoutes } from './+home/index';

const routes: RouterConfig = [
  ...SiteInfoRoutes,
  ...SelectSiteRoutes,
];
