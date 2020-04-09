var test = require('./lib/tape-nock-setup');
var BBY = require('../');

var bby = BBY({
  key: process.env.BBY_API_KEY || 'XXX',
  debug: false,
  headers: {
    'User-Agent': 'recommendations tests'
  }
});

var topTrendingSku;

// https://developer.bestbuy.com/documentation/products-api
test('Recommendations search', test.opts, function (t) {
  // Figure out the current top trending product
  bby.recommendations('trendingViewed')
    .then(function (data) {
      t.ok(data.results.length > 0, 'results returned');
      topTrendingSku = data.results[0].sku;
      return bby.products(+topTrendingSku);
    })
    .then(function (data) {
      t.equals(parseInt(data.sku), parseInt(topTrendingSku), 'correct product returned');
    })
    .catch(function (err) {
      t.error(err);
    })
    .then(t.end);
});

test('Recommendations search - trendingview - criteria as string', test.opts, function (t) {
  bby.recommendations('trendingViewed', 'abcat0502000')
    .then(function (data) {
      t.ok(data.results.length > 0, 'results returned');
      topTrendingSku = data.results[0].sku;
      return bby.products(+topTrendingSku);
    })
    .then(function (data) {
      t.equals(parseInt(data.sku), parseInt(topTrendingSku), 'correct product returned');
    })
    .catch(function (err) {
      t.error(err);
    })
    .then(t.end);
});

test('Recommendations search - trendingview - criteria as object', test.opts, function (t) {
  bby.recommendations('trendingViewed', { categoryId: 'abcat0502000' })
    .then(function (data) {
      t.ok(data.results.length > 0, 'results returned');
      topTrendingSku = data.results[0].sku;
      return bby.products(+topTrendingSku);
    })
    .then(function (data) {
      t.equals(parseInt(data.sku), parseInt(topTrendingSku), 'correct product returned');
    })
    .catch(function (err) {
      t.error(err);
    })
    .then(t.end);
});

test('Recommendations search using callbacks', test.opts, function (t) {
  // Figure out the current top trending product
  bby.recommendations('trendingViewed', function (err, data) {
    t.error(err);
    t.ok(data.results.length > 0, 'results returned');
    topTrendingSku = data.results[0].sku;
    bby.products(+topTrendingSku, function (err, data) {
      t.error(err);
      t.equals(parseInt(data.sku), parseInt(topTrendingSku), 'correct product returned');
      t.end();
    });
  });
});

test('Recommendations search also viewed', test.opts, function (t) {
  // Figure out the current top trending product
  bby.recommendations('alsoViewed', 1780275)
    .then(function (data) {
      t.ok(data.results.length > 0, 'results returned');
    })
    .catch(function (err) {
      t.error(err);
    })
    .then(t.end);
});

test('Recommendations search also viewed error', test.opts, function (t) {
  // Figure out the current top trending product
  bby.recommendations('alsoViewed')
    .catch(function (err) {
      t.equals(err.message, 'Recommendations endpoint requires 2nd parameter to be a SKU for the "alsoViewed" method');
    })
    .then(t.end);
});

test('Recommendations search - bad path', test.opts, function (t) {
  bby.recommendations('blah')
    .catch(function (err) {
      t.equals(err.message, 'Unrecognized path "blah"');
    })
    .then(t.end);
});

test('Recommendations search - function criteria not allowed', test.opts, function (t) {
  bby.recommendations('trendingViewed', function () {}, (err, result) => {
    t.equals(err.message, 'Unhandled parameter type');
    t.end();
  });
});
