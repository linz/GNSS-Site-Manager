import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'DEV',
  WEB_SERVICE_URL: 'https://sitelogprod-webservices.geodesy.linz.govt.nz',
  WFS_GEOSERVER_URL: 'https://sitelogprod-geoserver.geodesy.linz.govt.nz/geoserver/wfs',
  CLIENT_URL: 'https://gnss-site-manager.geodesy.linz.govt.nz',

  AWS_REGION: 'ap-southeast-2',
  CGN_POOL_ID: 'ap-southeast-2_4ZOvwDlhV',
  CGN_CLIENT_ID: '7k6sejqdqjh3rhkqpn0p8m3ogg',
  CGN_HOST_URL: 'https://sitelog-prod.auth.ap-southeast-2.amazoncognito.com',
};

export = ProdConfig;

