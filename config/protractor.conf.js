require('ts-node/register');
var fs = require('fs');
var helpers = require('./helpers');
var config = require('./config');

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
    privacy: helpers.root('test/**/privacy/*.feature'),
    full: helpers.root('test/**/*.feature')
  },

  cucumberOpts: {
    compiler: "ts:ts-node/register",
    require: [
      'test/**/*.steps.ts',
      'test/hooks.ts'
    ],
    strict: true
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

    // Creating the screenshots folder.
    helpers.ensureFolder(config.screenshotsPath);

    browser.ignoreSynchronization = true;
    browser.manage().timeouts().implicitlyWait(2000);
  }
};
