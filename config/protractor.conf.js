require('ts-node/register');
var helpers = require('./helpers');

exports.config = {

  baseUrl: 'http://www.google.com/',

  exclude: [],

  allScriptsTimeout: 110000,

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  specs: [
    helpers.root('test/e2e/**/*.feature')
  ],

  suites: {
    search: helpers.root('test/e2e/**/search/*.feature'),
    full: helpers.root('test/e2e/**/*.feature'),
  },

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
    
    // Global chai definition.
    global.chai = require('chai')
        .use(require('chai-things'))
        .use(require('chai-as-promised'))
        .use(require('chai-string'));
    chai.should();

    global.expect = chai.expect;

    browser.ignoreSynchronization = true;
    browser.manage().timeouts().implicitlyWait(2000);
  }
};
