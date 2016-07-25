require('ts-node/register');
var helpers = require('./helpers');

exports.config = {

  baseUrl: 'http://www.google.com/',

  exclude: [],

  allScriptsTimeout: 110000,

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  specs: [
    helpers.root('test/**/*.feature')
  ],

  suites: {
    search: helpers.root('test/**/search/*.feature'),
    full: helpers.root('test/**/*.feature'),
  },

  cucumberOpts: {
    require: [
      'test/**/*.steps.js'
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
