var test = require('./lib/tape-nock-setup');
var BBY = require('../');

var bby = BBY({
  key: process.env.BBY_API_KEY || 'XXX',
  headers: {
    'User-Agent': 'Products tests'
  }
});

// https://developer.bestbuy.com/documentation/products-api
test('Using Callback Product search for all items reviewed with exactly 4, show only name + sku', test.opts, function (t) {
  // Product search for all items reviewed with exactly 4, show only name + sku
  bby.products('customerReviewAverage=4', {
    show: 'name,sku'
  }, function (err, data) {
    t.false(err);
    t.ok(data.products.length > 0, 'has products');
    t.false(data.products[0].customerReviewCount, 'no reviews');
    t.false(data.products[0].customerReviewAverage, 'no review average');
    t.ok(data.products[0].name, 'has name');
    t.ok(data.products[0].sku, 'has sku');
    t.end();
  });
});

test('Using Promise Product search for all items reviewed with exactly 4, show only name + sku', test.opts, function (t) {
  // Product search for all items reviewed with exactly 4, show only name + sku
  bby.products('customerReviewAverage=4', {
    show: 'name,sku'
  })
    .then(function (data) {
      t.ok(data.products.length > 0, 'has products');
      t.false(data.products[0].customerReviewCount, 'no review count');
      t.false(data.products[0].customerReviewAverage, 'no review average');
      t.ok(data.products[0].name, 'has name');
      t.ok(data.products[0].sku, 'has sku');
    })
    .then(t.end);
});

test('Using Promise Product search for all items reviewed with exactly 4, show only name + sku as xml', test.opts, function (t) {
  // Product search for all items reviewed with exactly 4, show only name + sku
  bby.products('customerReviewAverage=4', {
    show: 'name,sku',
    format: 'xml'
  })
    .then(function (data) {
      t.ok(data.startsWith('<?xml'), 'xml string returned');
      t.ok(data.indexOf('product>') > -1, 'products returned');
    })
    .then(t.end);
});

test('Product search with paging', test.opts, function (t) {
  // Product search for all items reviewed with exactly 4, show only name + sku
  bby.products('type=Movie', {
    show: 'name,sku',
    pageSize: 5,
    page: 2
  })
    .then(function (data) {
      t.ok(data.products.length > 0, 'has results');
      t.false(data.products[0].customerReviewCount);
      t.false(data.products[0].customerReviewAverage);
      t.ok(data.products[0].name, 'has name');
      t.ok(data.products[0].sku, 'has sku');
      t.equals(data.from, 6, 'from is equal to 6');
    })
    .then(t.end);
});

test('Product search beginning with asterisk should fail', test.opts, function (t) {
  // Product search for all items reviewed with exactly 4, show only name + sku
  bby.products('name=***phone*', {
    show: 'name,sku'
  })
    .catch(function (error) {
      t.equals(error.status, 400, 'error code 400 returned');
      t.ok(error.body.error, 'error element present');
      t.end();
    });
});

test('Is a garbage search', test.opts, function (t) {
  // Do a search which emits an error
  bby.products('gurgleflats')
    .catch(function (error) {
      t.equals(error.status, 400, 'status 400 returned');
      t.ok(error.body.error, 'error element present');
      t.end();
    });
});

test('Is a garbage search - callback', test.opts, function (t) {
  // Do a search which emits an error
  bby.products('gurgleflats', (err, result) => {
    t.equals(err.status, 400, 'status 400 returned');
    t.ok(err.body.error, 'error element present');
    t.end();
  });
});

test('Products search - function criteria not allowed', test.opts, function (t) {
  bby.products('name=phone', function () {}, (err, result) => {
    t.equals(err.message, 'Unhandled parameter type');
    t.end();
  });
});

test('Search multiple attributes and filter', test.opts, function (t) {
  bby.products('manufacturer=canon&salePrice<1000', {
    format: 'json',
    show: 'sku,name,salePrice'
  })
    .then(function (data) {
      t.false(data.products[0].customerReviewCount, 'no review count');
      t.false(data.products[0].customerReviewAverage, 'no rewview average');
      t.ok(data.products[0].name, 'has name');
      t.ok(data.products[0].sku, 'has sku');
      t.ok(data.products[0].salePrice, 'has salePrice');
    })
    .then(t.end);
});

test('Products as stream', test.opts, function (t) {
  var stream = bby.productsAsStream('manufacturer=canon&salePrice<500', {
    format: 'json',
    show: 'sku,name,salePrice'
  });

  var cnt = 0;
  var total;

  stream.on('data', data => {
    cnt++;
    t.deepEquals(Object.keys(data), ['sku', 'name', 'salePrice'], 'correct keys present');
  });
  stream.on('total', (t) => { total = t; });

  stream.on('end', () => {
    t.equals(cnt, total, `data emitted matches total results (${cnt}/${total})`);
    t.end();
  });
});

test('stream a single product by sku', test.opts, function (t) {
  var stream = bby.productsAsStream(5758400);

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

test('Products as xml stream', test.opts, function (t) {
  var stream = bby.productsAsStream('manufacturer=canon&salePrice<500', {
    format: 'xml',
    show: 'sku,name,salePrice'
  });

  var cnt = 0;
  var total;

  stream.on('data', data => {
    cnt++;
    t.ok(data.toString().match(/^<product>.*/), 'correct xml text present');
  });
  stream.on('total', (t) => { total = t; });

  stream.on('end', () => {
    t.equals(cnt, total, `data emitted matches total results (${cnt}/${total})`);
    t.end();
  });
});

test('Single Product as xml stream', test.opts, function (t) {
  var stream = bby.productsAsStream(5758400, {
    format: 'xml',
    show: 'sku,name,salePrice'
  });

  var cnt = 0;
  var total;

  stream.on('data', data => {
    cnt++;
    t.ok(data.toString().match(/^<product>.*/), 'correct xml text present');
  });
  stream.on('total', (t) => { total = t; });

  stream.on('end', () => {
    t.equals(cnt, total, `data emitted matches total results (${cnt}/${total})`);
    t.end();
  });
});

test('Handles garbage search with xml stream', test.opts, function (t) {
  const stream = bby.productsAsStream('gurgleflats', { format: 'xml' });
  stream.on('error', err => {
    t.equals(err.status, 400, 'returns response status');
    t.ok(err.body.indexOf('<error') > -1, 'error element present');
    t.end();
  });
});

test('Handles garbage search with json stream', test.opts, function (t) {
  const stream = bby.productsAsStream('gurgleflats', { format: 'json' });
  stream.on('error', err => {
    t.equals(err.status, 400, 'returns response status');
    t.ok(err.body.error, 'error element present');
    t.end();
  });
});
