var test = require('./lib/tape-nock-setup');
var BBY = require('../');

var bby = BBY({
  key: process.env.BBY_API_KEY || 'XXX',
  debug: false,
  headers: {
    'User-Agent': 'Version tests'
  }
});

test('Get the API and Package version', test.opts, function (t) {
  bby.version()
    .then(function (data) {
      t.ok(data.packageVersion, 'package version returned');
      t.ok(data.apiVersion, 'API version returned');
      t.end();
    })
    .catch(err => {
      t.error(err, 'no error');
      t.end();
    });
});

test('Get the API and Package version with callback', test.opts, function (t) {
  bby.version(function (err, data) {
    t.error(err, 'no error');
    t.ok(data.packageVersion, 'package version returned');
    t.ok(data.apiVersion, 'API version returned');
    t.end();
  });
});
