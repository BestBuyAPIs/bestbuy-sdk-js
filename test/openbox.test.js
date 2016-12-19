var test = require('./lib/tape-nock-setup');
var BBY = require('../bestbuy');

var OPEN_BOX_SKU = 2557948; // ipad mini

var bby = BBY({
  key: process.env.BBY_API_KEY,
  debug: false,
  headers: {
    'User-Agent': 'open box tests'
  }
});

test('Open box - search for all items', test.opts, function (t) {
  // Product search for all items reviewed with exactly 4, show only name + sku
  bby.openBox(null, {
    show: 'name,sku'
  })
  .then(function (data) {
    t.ok(data.results.length > 0, 'has results');
    t.ok(data.results[0].customerReviews.count, 'has count of customerReviews');
    t.ok(data.results[0].customerReviews.averageScore, 'has averageScore of customerReviews');
    t.ok(data.results[0].names, 'has names');
    t.ok(data.results[0].offers.length > 0, 'has offers');
  })
  .catch(function (err) {
    t.error(err);
  })
  .finally(t.end);
});

test('Open box - search for one item', test.opts, function (t) {
  // Product search for all items reviewed with exactly 4, show only name + sku
  bby.openBox(OPEN_BOX_SKU)
  .then(function (data) {
    t.ok(data.results.length > 0, 'has results');
    t.ok(data.results[0].customerReviews.count, 'has count of customerReviews');
    t.ok(data.results[0].customerReviews.averageScore, 'has averageScore of customerReviews');
    t.ok(data.results[0].names, 'has names');
    t.ok(data.results[0].offers.length > 0, 'has offers');
  })
  .catch(function (err) {
    t.error(err);
  })
  .finally(t.end);
});

test('Open box - search for one item using sku as string', test.opts, function (t) {
  // Product search for all items reviewed with exactly 4, show only name + sku
  bby.openBox(String(OPEN_BOX_SKU))
  .then(function (data) {
    t.ok(data.results.length > 0, 'has results');
    t.ok(data.results[0].customerReviews.count, 'has count of customerReviews');
    t.ok(data.results[0].customerReviews.averageScore, 'has averageScore of customerReviews');
    t.ok(data.results[0].names, 'has names');
    t.ok(data.results[0].offers.length > 0, 'has offers');
  })
  .catch(function (err) {
    t.error(err);
  })
  .finally(t.end);
});

test('Open box - search for one item using search as string', test.opts, function (t) {
  // Product search for all items reviewed with exactly 4, show only name + sku
  bby.openBox('categoryId=abcat0502000')
  .then(function (data) {
    t.ok(data.results.length > 0, 'has results');
    t.ok(data.results[0].customerReviews.count, 'has count of customerReviews');
    t.ok(data.results[0].customerReviews.averageScore, 'has averageScore of customerReviews');
    t.ok(data.results[0].names, 'has names');
    t.ok(data.results[0].offers.length > 0, 'has offers');
  })
  .catch(function (err) {
    t.error(err);
  })
  .finally(t.end);
});

test('Open box - search for one item using callback', test.opts, function (t) {
  // Product search for all items reviewed with exactly 4, show only name + sku
  bby.openBox(OPEN_BOX_SKU, function (err, data) {
    t.error(err, 'no error');
    t.ok(data.results.length > 0, 'has results');
    t.ok(data.results[0].customerReviews.count, 'has count of customerReviews');
    t.ok(data.results[0].customerReviews.averageScore, 'has averageScore of customerReviews');
    t.ok(data.results[0].names, 'has names');
    t.ok(data.results[0].offers.length > 0, 'has offers');
    t.end();
  });
});
