import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'DEV',
  WEB_SERVICE_URL: 'https://gws.geodesy.ga.gov.au',
  WFS_GEOSERVER_URL: 'https://prodgeodesy-geoserver.geodesy.ga.gov.au/geoserver/wfs',
  OPENAM_SERVER_URL: 'https://prodgeodesy-openam.geodesy.ga.gov.au/openam',
  CLIENT_URL: 'https://gnss-site-manager.geodesy.ga.gov.au'
};

export = ProdConfig;

