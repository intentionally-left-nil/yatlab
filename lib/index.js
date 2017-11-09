'use strict';

var _server = require('./server');

var _yargs = require('yargs');

if (_yargs.argv.start) {
  var token = process.env.SLACK_BOT_TOKEN;
  (0, _server.start)({ token: token });
} else {
  console.log('no start');
}