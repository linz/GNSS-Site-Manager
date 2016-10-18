import {EnvConfig} from './env-config.interface';

const DevConfig: EnvConfig = {
  ENV: 'DEV',
  WEB_SERVICE_URL: 'https://dev.geodesy.ga.gov.au',
  WFS_GEOSERVER_URL: 'https://devgeodesy-geoserverelb.geodesy.ga.gov.au/geoserver/wfs',
};

export = DevConfig;

