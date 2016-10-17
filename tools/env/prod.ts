import {EnvConfig} from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'PROD',
  WEBSERVICEURL: 'https://geodesy.ga.gov.au',
  WFSGEOSERVERURL: 'https://geodesy-geoserverelb.geodesy.ga.gov.au/geoserver/wfs',
};

export = ProdConfig;

