require('ts-node/register');
var helpers = require('./helpers');

exports.config = {


  /* LOCALHOST CONFIG */
  seleniumServerJar: "node_modules/protractor/selenium/selenium-server-standalone-2.52.0.jar",
  baseUrl: 'http://www.google.com/',

  exclude: [],

  allScriptsTimeout: 110000,

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: [
    helpers.root('test/e2e/**/*.feature')
  ],
  cucumberOpts: {
    require: [
      'test/e2e/**/*.steps.js'
    ],
    format: 'pretty'
  },

  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': []
    }
  },

  onPrepare: function() {
    browser.ignoreSynchronization = true;
    browser.manage().timeouts().implicitlyWait(2000);
  }

};
