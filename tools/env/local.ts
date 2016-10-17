import {EnvConfig} from './env-config.interface';

const LocalConfig: EnvConfig = {
  ENV: 'LOCAL',
  WEBSERVICEURL: 'http://localhost:8080/geodesy-web-services',
  WFSGEOSERVERURL: 'https://localhost:8080/geoserver/wfs',
};

export = LocalConfig;

