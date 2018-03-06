import { EnvConfig } from './env-config.interface';

const DevConfig: EnvConfig = {
  ENV: 'DEV',
  // WEB_SERVICE_URL: 'https://devgeodesy-webservices.geodesy.ga.gov.au',
  // WFS_GEOSERVER_URL: 'https://devgeodesy-geoserver.geodesy.ga.gov.au/geoserver/wfs',
  OPENAM_SERVER_URL: 'https://devgeodesy-openam.geodesy.ga.gov.au/openam',
  //CLIENT_URL: 'https://dev.gnss-site-manager.geodesy.ga.gov.au'
  // ENV: 'LOCAL',

  WEB_SERVICE_URL: 'https://localhost:9500',
  WFS_GEOSERVER_URL: 'https://localhost:8082/wfs',
  // OPENAM_SERVER_URL: 'http://localhost:8083/openam',
  CLIENT_URL: 'http://localhost:5555',
  AWS_REGION: 'ap-southeast-2',
  CGN_POOL_ID: 'ap-southeast-2_q0oHPJ0N5',
  CGN_CLIENT_ID: '4hpg5n34kduiedr7taqipdo77h',
};

export = DevConfig;

