import {EnvConfig} from './env-config.interface';

const UatConfig: EnvConfig = {
  ENV: 'UAT',
  WEB_SERVICE_URL: 'https://uat1geodesy-webservices.geodesy.ga.gov.au',
  WFS_GEOSERVER_URL: 'https://uat1geodesy-geoserver.geodesy.ga.gov.au/geoserver/wfs',
};

export = UatConfig;

