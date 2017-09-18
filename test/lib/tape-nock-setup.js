var tape = require('tape');
var path = require('path');
var test = require('tape-nock')(tape, {
  fixtures: path.join(__dirname, '..', 'fixtures')
});

test.opts = {
  afterRecord: function (scopes) {
    // avoid exposing API keys in the fixtures
    var scopesString = JSON.stringify(scopes);
    scopesString = scopesString.replace(/apiKey=[^\\<&"]+/g, 'apiKey=XXX');
    return JSON.parse(scopesString);
  },
  after: function (scope) {
    // when running test, switch apiKey to XXX to match fixtures
    scope.filteringPath(/apiKey=[^&]+/g, 'apiKey=XXX');
  }
};

module.exports = test;
