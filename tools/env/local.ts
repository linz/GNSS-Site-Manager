import {EnvConfig} from './env-config.interface';

const LocalConfig: EnvConfig = {
  ENV: 'LOCAL',
  WEB_SERVICE_URL: 'http://localhost:8080/geodesy-web-services',
  WFS_GEOSERVER_URL: 'http://localhost:8080/geoserver/wfs',
};

export = LocalConfig;

