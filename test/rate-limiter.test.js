var test = require('./lib/tape-nock-setup');
var BBY = require('../');

test('Test Rate Limiting 1 per second', test.opts, function (t) {
  var bby = BBY({
    key: process.env.BBY_API_KEY,
    debug: false,
    headers: {
      'User-Agent': 'rate limiter tests'
    },
    requestsPerSecond: 1
  });
  const NS_PER_SEC = 1e9;
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
    key: process.env.BBY_API_KEY,
    debug: false,
    headers: {
      'User-Agent': 'rate limiter tests'
    }
  });
  const NS_PER_SEC = 1e9;
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
    key: process.env.BBY_API_KEY,
    debug: true,
    headers: {
      'User-Agent': 'rate limiter tests'
    }
  });
  const NS_PER_SEC = 1e9;
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
  setTimeout(t.end, 2000);
});

test('Test Rate Limiting torture test', test.opts, function (t) {
  var bby = BBY({
    key: process.env.BBY_API_KEY,
    debug: false,
    headers: {
      'User-Agent': 'rate limiter tests'
    },
    requestsPerSecond: 5
  });
  const NS_PER_SEC = 1e9;
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

