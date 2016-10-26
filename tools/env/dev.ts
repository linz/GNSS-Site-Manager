import {EnvConfig} from './env-config.interface';

const DevConfig: EnvConfig = {
  ENV: 'DEV',
  WEB_SERVICE_URL: 'https://adevgeodesy-webservices.geodesy.ga.gov.au',
  WFS_GEOSERVER_URL: 'https://adevgeodesy-geoserver.geodesy.ga.gov.au/geoserver/wfs'
};

export = DevConfig;

