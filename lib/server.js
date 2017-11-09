'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = undefined;

var _client = require('@slack/client');

var start = function start(_ref) {
  var token = _ref.token;

  var rtm = new _client.RtmClient(token);
  console.log('start');
  if (true) return;
  rtm.start();
};

exports.start = start;