var test = require('./lib/tape-nock-setup');
var BBY = require('../bestbuy');

var bby = BBY({
  key: process.env.BBY_API_KEY,
  debug: false,
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
  .finally(t.end);
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
  .finally(t.end);
});

test('Product search beginning with asterisk should fail', test.opts, function (t) {
  // Product search for all items reviewed with exactly 4, show only name + sku
  bby.products('name=***phone*', {
    show: 'name,sku'
  })
  .catch(function (data) {
    t.equals(data.statusCode, 400, 'statusCode 400 returned');
    t.equals(data.error.error.code, 400, 'error code 400 returned');
  })
  .finally(t.end);
});

test('Is a garbage search', test.opts, function (t) {
  // Do a search which emits an error
  bby.products('gurgleflats????4')
  .catch(function (data) {
    t.equals(data.statusCode, 400, 'statusCode 400 returned');
    t.equals(data.error.error.code, 400, 'error code 400 returned');
  })
  .finally(t.end);
});

test('Is a garbage search - callback', test.opts, function (t) {
  // Do a search which emits an error
  bby.products('gurgleflats????4', (err, result) => {
    t.equals(err.statusCode, 400, 'statusCode 400 returned');
    t.equals(err.error.error.code, 400, 'error code 400 returned');
    t.end();
  });
});

test('Products search - function criteria not allowed', test.opts, function (t) {
  bby.products('name=***phone*', function () {}, (err, result) => {
    t.equals(err, 'Unhandled parameter type');
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
  .finally(t.end);
});
