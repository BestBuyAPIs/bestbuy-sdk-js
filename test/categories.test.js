var test = require('./lib/tape-nock-setup');
var BBY = require('../');

var bby = BBY({
  key: process.env.BBY_API_KEY,
  debug: false,
  headers: {
    'User-Agent': 'Categories tests'
  }
});

// https://developer.bestbuy.com/documentation/products-api
test('Fetch all categories', test.opts, function (t) {
  // Product search for all items reviewed with exactly 4, show only name + sku
  bby.categories('', {
    show: 'name,id'
  })
  .then(function (data) {
    t.ok(data.categories.length > 0, 'categories returned');
    t.false(data.categories[0].active, 'no active');
    t.ok(data.categories[0].name, 'name returned');
    t.ok(data.categories[0].id, 'id returned');
  })
  .catch(function (err) {
    t.error(err);
  })
  .then(t.end);
});

test('Fetch Categories with name and page size and callback', test.opts, function (t) {
  // Product search for all items reviewed with exactly 4, show only name + sku
  bby.categories('(name=Video Games)', {pageSize: 1}, function (err, data) {
    t.error(err, 'no error');

    t.ok(data.categories.length > 0, 'categories returned');
    t.ok(data.categories[0].name, 'name returned');
    t.ok(data.categories[0].id, 'id returned');
    t.ok(data.categories[0].active, 'active returned');

    t.end();
  });
});

test('Fetch Categories with name and callback', test.opts, function (t) {
  // Product search for all items reviewed with exactly 4, show only name + sku
  bby.categories('(name=Video Games)', function (err, data) {
    t.error(err, 'no error');

    t.ok(data.categories.length > 0, 'categories returned');
    t.ok(data.categories[0].name, 'name returned');
    t.ok(data.categories[0].id, 'id returned');
    t.ok(data.categories[0].active, 'active returned');

    t.end();
  });
});
