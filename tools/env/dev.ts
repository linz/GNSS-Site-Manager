import {EnvConfig} from './env-config.interface';

const DevConfig: EnvConfig = {
  ENV: 'DEV',
  WEBSERVICEURL: 'https://dev.geodesy.ga.gov.au',
  WFSGEOSERVERURL: 'https://devgeodesy-geoserverelb.geodesy.ga.gov.au/geoserver/wfs',
};

export = DevConfig;

