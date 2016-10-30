import {EnvConfig} from './env-config.interface';

const DevConfig: EnvConfig = {
  ENV: 'DEV',
  WEB_SERVICE_URL: 'https://devgeodesy-webservices.geodesy.ga.gov.au',
  WFS_GEOSERVER_URL: 'https://devgeodesy-geoserver.geodesy.ga.gov.au/geoserver/wfs'
};

export = DevConfig;

