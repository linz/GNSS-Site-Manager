import { EnvConfig } from './env-config.interface';

const TestConfig: EnvConfig = {
  ENV: 'TEST',
  WFS_GEOSERVER_URL: 'https://sitelogtest-geoserver.geodesy.linz.govt.nz/geoserver/wfs',
  // WFS_GEOSERVER_URL: 'https://localhost:8082/wfs',
  WEB_SERVICE_URL: 'https://sitelogtest-webservices.geodesy.linz.govt.nz',
  // WEB_SERVICE_URL: 'https://localhost:9500',
  CLIENT_URL: 'https://test.gnss-site-manager.geodesy.linz.govt.nz',
  // CLIENT_URL: 'https://gnss-site-manager.geodesy.linz.io',
  // CLIENT_URL: 'https://localhost:9555',
  AWS_REGION: 'ap-southeast-2',
  CGN_POOL_ID: 'ap-southeast-2_m9eQqLLaH',
  CGN_CLIENT_ID: '2v1d0ev243h4g7gpkeccpsmmra',
  CGN_HOST_URL: 'https://sitelog-test.auth.ap-southeast-2.amazoncognito.com',

};

export = TestConfig;

