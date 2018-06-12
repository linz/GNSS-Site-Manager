import { EnvConfig } from './env-config.interface';

const DevConfig: EnvConfig = {
  ENV: 'DEV',
  // ENV: 'LOCAL',
  WFS_GEOSERVER_URL: 'https://sitelogdev-geoserver.geodesy.linz.io/geoserver/wfs',
  // WFS_GEOSERVER_URL: 'https://localhost:8082/wfs',
  WEB_SERVICE_URL: 'https://sitelogdev-webservices.geodesy.linz.io',
  // WEB_SERVICE_URL: 'https://localhost:9500',
  CLIENT_URL: 'https://gnss-site-manager.geodesy.linz.io',
  // CLIENT_URL: 'https://gnss-site-manager.geodesy.linz.io',
  // CLIENT_URL: 'https://localhost:9555',
  AWS_REGION: 'ap-southeast-2',
  CGN_POOL_ID: 'ap-southeast-2_m9eQqLLaH',
  CGN_CLIENT_ID: '2v1d0ev243h4g7gpkeccpsmmra',
  CGN_HOST_URL: 'https://sitelog-dev.auth.ap-southeast-2.amazoncognito.com',
};

export = DevConfig;

