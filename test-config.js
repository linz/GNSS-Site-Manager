// Load our SystemJS configuration.
System.config({
  baseURL: '/base/',
  map: {
      'moment': 'node_modules/moment/moment',
      'ngx-bootstrap': 'node_modules/ngx-bootstrap/bundles/ngx-bootstrap.umd',
      'lodash': 'node_modules/lodash/lodash.js',
      'alertify.js': 'node_modules/alertify.js/dist/js/alertify.js',
      'scroll-into-view': 'node_modules/scroll-into-view/scrollIntoView.js',
      'foreach': 'node_modules/foreach/index',
      //'raf': 'node_modules/raf/index',
      'performance-now': 'node_modules/performance-now/lib/performance-now',
      'oidc-client': 'node_modules/oidc-client/lib/oidc-client',
      'map-factory': 'node_modules/map-factory/dist/lib/map-factory.js'
  },
  paths: {
    rxjs: 'node_modules/rxjs',
  },
  packages: {
    '': {
      defaultExtension: 'js'
    },
    rxjs: {
      defaultExtension: 'js'
    }
  }
});
