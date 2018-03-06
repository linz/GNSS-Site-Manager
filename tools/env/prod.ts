import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'DEV',
  WEB_SERVICE_URL: 'https://gws.geodesy.ga.gov.au',
  WFS_GEOSERVER_URL: 'https://prodgeodesy-geoserver.geodesy.ga.gov.au/geoserver/wfs',
  OPENAM_SERVER_URL: 'https://prodgeodesy-openam.geodesy.ga.gov.au/openam',
  CLIENT_URL: 'https://gnss-site-manager.geodesy.ga.gov.au',

  AWS_REGION: 'ap-southeast-2',
  CGN_POOL_ID: 'ap-southeast-2_q0oHPJ0N5',
  CGN_CLIENT_ID: '4hpg5n34kduiedr7taqipdo77h',
};

export = ProdConfig;

