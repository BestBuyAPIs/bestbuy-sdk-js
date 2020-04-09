var test = require('./lib/tape-nock-setup');
var BBY = require('../');

const NS_PER_SEC = 1000000000;

test('Test Rate Limiting 1 per second', test.opts, function (t) {
  var bby = BBY({
    key: process.env.BBY_API_KEY || 'XXX',
    debug: false,
    headers: {
      'User-Agent': 'rate limiter tests'
    },
    requestsPerSecond: 1
  });
  var start = process.hrtime();

  var promises = [
    bby.version(),
    bby.version(),
    bby.version()
  ];

  Promise.all(promises)
    .then(result => {
      var diff = process.hrtime(start);
      var totalTime = diff[0] * NS_PER_SEC + diff[1];

      t.ok(totalTime > (promises.length - 1) * NS_PER_SEC, `took more than 2 seconds (${totalTime / NS_PER_SEC})`);
      t.end();
    })
    .catch(error => {
      t.error(error);
      t.end();
    });
});

test('Test Rate Limiting default 5 per second', test.opts, function (t) {
  var bby = BBY({
    key: process.env.BBY_API_KEY || 'XXX',
    debug: false,
    headers: {
      'User-Agent': 'rate limiter tests'
    }
  });
  var start = process.hrtime();

  var promises = [
    bby.version(),
    bby.version(),
    bby.version(),
    bby.version(),
    bby.version(),
    bby.version(),
    bby.version(),
    bby.version(),
    bby.version(),
    bby.version()
  ];

  Promise.all(promises)
    .then(result => {
      var diff = process.hrtime(start);
      var totalTime = diff[0] * NS_PER_SEC + diff[1];

      t.ok(totalTime > 1 * NS_PER_SEC, `took more than 1 second (${totalTime / NS_PER_SEC})`);
      t.end();
    })
    .catch(error => {
      t.error(error);
      t.end();
    });
});

test('Test Rate Limiting default 5 per second with debug', test.opts, function (t) {
  var bby = BBY({
    key: process.env.BBY_API_KEY || 'XXX',
    debug: true,
    headers: {
      'User-Agent': 'rate limiter tests'
    }
  });
  var start = process.hrtime();

  var promises = [
    bby.version(),
    bby.version(),
    bby.version(),
    bby.version(),
    bby.version(),
    bby.version(),
    bby.version(),
    bby.version(),
    bby.version(),
    bby.version()
  ];

  Promise.all(promises)
    .then(result => {
      var diff = process.hrtime(start);
      var totalTime = diff[0] * NS_PER_SEC + diff[1];

      t.ok(totalTime > 1 * NS_PER_SEC, `took more than 1 second (${totalTime / NS_PER_SEC})`);
      t.end();
    })
    .catch(error => {
      t.error(error);
      t.end();
    });
});

test('cooldown for rate limit reset', test.opts, function (t) {
  setTimeout(t.end, 5000);
});

test('Test Rate Limiting torture test', test.opts, function (t) {
  var bby = BBY({
    key: process.env.BBY_API_KEY || 'XXX',
    debug: false,
    headers: {
      'User-Agent': 'rate limiter tests'
    },
    requestsPerSecond: 5
  });
  var start = process.hrtime();

  var promises = [
    bby.version(), bby.version(), bby.version(), bby.version(), bby.version(),
    bby.version(), bby.version(), bby.version(), bby.version(), bby.version(),
    bby.version(), bby.version(), bby.version(), bby.version(), bby.version(),
    bby.version(), bby.version(), bby.version(), bby.version(), bby.version(),
    bby.version(), bby.version(), bby.version(), bby.version(), bby.version(),
    bby.version(), bby.version(), bby.version(), bby.version(), bby.version(),
    bby.version(), bby.version(), bby.version(), bby.version(), bby.version(),
    bby.version(), bby.version(), bby.version(), bby.version(), bby.version(),
    bby.version(), bby.version(), bby.version(), bby.version(), bby.version(),
    bby.version(), bby.version(), bby.version(), bby.version(), bby.version()
  ];

  Promise.all(promises)
    .then(result => {
      var diff = process.hrtime(start);
      var totalTime = diff[0] * NS_PER_SEC + diff[1];

      t.ok(totalTime > 1 * NS_PER_SEC, `took more than 1 second (${totalTime / NS_PER_SEC})`);
      t.end();
    })
    .catch(error => {
      console.log(error.message);
      t.error(error, 'no error');
      t.end();
    });
});
