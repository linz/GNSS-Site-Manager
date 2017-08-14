const config = {
  baseUrl: 'http://localhost:5555/',

  suites: {
    login: [
      './dist/e2e/specs/login/**/*.e2e-spec.js'
    ],
    toolbar: [
      './dist/e2e/specs/toolbar/**/*.e2e-spec.js'
    ],
    selectSite: [
      './dist/e2e/specs/select-site/**/*.e2e-spec.js'
    ],
    siteLogGroups: [
      './dist/e2e/specs/site-log-groups/**/*.e2e-spec.js'
    ],
// TODO: This test takes a really long time, so we don't want CI to run it.
// Work out how to selectively run test suites.
//    allSites: [
//      './dist/e2e/specs/all-sites/**/*.e2e-spec.js'
//    ],
  },

  exclude: [],

  // 'jasmine' by default will use the latest jasmine framework
  framework: 'jasmine',
  chromeDriver: process.env.CHROMEDRIVER_BIN ? process.env.CHROMEDRIVER_BIN : undefined,

  // allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    // showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 200000
  },

  directConnect: true,

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--window-size=600,800'],
      binary: process.env.CHROME_BIN,
      prefs: {
        credentials_enable_service: false,
        profile: {
          password_manager_enabled: false
        }
      },
    },
  },

  onPrepare: function() {
    browser.ignoreSynchronization = false;
  },

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   */
  useAllAngular2AppRoots: true
};

if (process.env.TRAVIS) {
  config.capabilities = {
    browserName: 'chrome'
  };
}

exports.config = config;
