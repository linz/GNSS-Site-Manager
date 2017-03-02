import { EnvConfig } from './env-config.interface';

const DockerConfig: EnvConfig = {
  ENV: 'LOCAL',
  WEB_SERVICE_URL: 'http://localhost:9081',
  WFS_GEOSERVER_URL: 'http://localhost:9082/wfs',
};

export = DockerConfig;

