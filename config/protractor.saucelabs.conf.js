require('ts-node/register');
var helpers = require('./helpers');

exports.config = {

  /* SAUCELABS CONFIG */
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  baseUrl: 'http://www.google.com',

  exclude: [],

  allScriptsTimeout: 110000,

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: [
    helpers.root('test/e2e/**/*.feature')
  ],
  cucumberOpts: {
    require: [
      'test/e2e/**/*.steps.ts'
    ],
    format: 'pretty'
  },

  multiCapabilities: [
    {
      'platform': 'Windows 7',
      'browserName': 'chrome',
      'version': '49'
    },
    {
      'platform': 'Windows 7',
      'browserName': 'chrome',
      'version': '48'
    }
  ],

  onPrepare: function () {
    browser.ignoreSynchronization = true;
    browser.manage().timeouts().implicitlyWait(2000);
  }

};
