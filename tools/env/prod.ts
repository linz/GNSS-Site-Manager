import {EnvConfig} from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'PROD',
  WEB_SERVICE_URL: 'https://geodesy.ga.gov.au',
  WFS_GEOSERVER_URL: 'https://geodesy-geoserverelb.geodesy.ga.gov.au/geoserver/wfs',
};

export = ProdConfig;

