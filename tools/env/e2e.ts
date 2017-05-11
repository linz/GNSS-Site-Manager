import { EnvConfig } from './env-config.interface';

const E2EConfig: EnvConfig = {
  ENV: 'E2E',
  WEB_SERVICE_URL: 'https://devgeodesy-webservices.geodesy.ga.gov.au',
  WFS_GEOSERVER_URL: 'https://devgeodesy-geoserver.geodesy.ga.gov.au/geoserver/wfs',
  OPENAM_SERVER_URL: 'https://devgeodesy-openam.geodesy.ga.gov.au/openam',
  CLIENT_URL: 'http://localhost:5555'
};

export = E2EConfig;

