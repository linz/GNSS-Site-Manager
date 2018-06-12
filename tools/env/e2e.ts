import { EnvConfig } from './env-config.interface';

const E2EConfig: EnvConfig = {
  ENV: 'DEV',
  // ENV: 'LOCAL',
  WFS_GEOSERVER_URL: 'https://devgeodesy-geoserver.gnss.linz.io/geoserver/wfs',
  // WFS_GEOSERVER_URL: 'https://localhost:8082/wfs',
  WEB_SERVICE_URL: 'https://devgeodesy-webservices.gnss.linz.io',
  // WEB_SERVICE_URL: 'https://localhost:9500',
  CLIENT_URL: 'https://localhost:9555',
  // CLIENT_URL: 'https://gnss-site-manager.geodesy.linz.io',
  AWS_REGION: 'ap-southeast-2',
  CGN_POOL_ID: 'ap-southeast-2_q0oHPJ0N5',
  CGN_CLIENT_ID: '4hpg5n34kduiedr7taqipdo77h',
  CGN_HOST_URL: 'https://reactgem.auth.ap-southeast-2.amazoncognito.com',
};

export = E2EConfig;

