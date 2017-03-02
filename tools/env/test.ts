import { EnvConfig } from './env-config.interface';

const TestConfig: EnvConfig = {
  ENV: 'TEST',
  WEB_SERVICE_URL: 'https://testgeodesy-webservices.geodesy.ga.gov.au',
  WFS_GEOSERVER_URL: 'https://testgeodesy-geoserver.geodesy.ga.gov.au/geoserver/wfs',
};

export = TestConfig;

