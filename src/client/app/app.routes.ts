import { provideRouter, RouterConfig } from '@angular/router';

import { AboutRoutes } from './+about/index';
import { SelectSiteRoutes } from './+select-site/index';
import { HomeRoutes } from './+home/index';

const routes: RouterConfig = [
  ...SelectSiteRoutes,
  ...HomeRoutes,
  ...AboutRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
];
