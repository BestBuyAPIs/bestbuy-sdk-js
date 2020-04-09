var test = require('./lib/tape-nock-setup');
var BBY = require('../');

var OPEN_BOX_SKU = 5762002; // Samsung - 50\" Class (49.5\" Diag.) - LED - 2160p - Smart - 4K Ultra HD TV

var bby = BBY({
  key: process.env.BBY_API_KEY || 'XXX',
  debug: false,
  headers: {
    'User-Agent': 'open box tests'
  }
});

test('Open box - search for all items', test.opts, function (t) {
  bby.openBox(null, {
    show: 'name,sku'
  })
    .then(function (data) {
      t.ok(data.results.length > 0, 'has results');
      t.ok(data.results[0].customerReviews.count, 'has count of customerReviews');
      t.ok(data.results[0].customerReviews.averageScore, 'has averageScore of customerReviews');
      t.ok(data.results[0].names, 'has names');
      t.ok(data.results[0].offers.length > 0, 'has offers');
      t.end();
    })
    .catch(function (err) {
      t.error(err, 'no error');
      t.end();
    });
});

test('Open box - search for one item', test.opts, function (t) {
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
    .then(t.end);
});

test('Open box - search for one item using sku as string', test.opts, function (t) {
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
    .then(t.end);
});

test('Open box - search for one item using search as string', test.opts, function (t) {
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
    .then(t.end);
});

test('Open box - search for one item using callback', test.opts, function (t) {
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

test('Get open box as stream', test.opts, function (t) {
  // Do a query for stores
  var stream = bby.openBoxAsStream('categoryId=abcat0502000');

  var cnt = 0;
  var total;

  stream.on('data', data => {
    cnt++;
  });
  stream.on('total', (t) => { total = t; });

  stream.on('error', (err) => {
    t.error(err);
    t.end();
  });

  stream.on('end', () => {
    t.equals(cnt, total, `data emitted matches total results (${cnt}/${total})`);
    t.end();
  });
});
