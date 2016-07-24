require('ts-node/register');
var helpers = require('./helpers');
var config = require('./protractor.conf.js').config;

config.directConnect = true;

config.capabilities = {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': []
    }
  },

exports.config = config;
