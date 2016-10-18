import {EnvConfig} from './env-config.interface';

const TestConfig: EnvConfig = {
  ENV: 'TEST',
  WEB_SERVICE_URL: 'https://test.geodesy.ga.gov.au',
  WFS_GEOSERVER_URL: 'https://testgeodesy-geoserverelb.geodesy.ga.gov.au/geoserver/wfs',
};

export = TestConfig;

