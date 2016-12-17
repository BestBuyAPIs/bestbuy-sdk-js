var test = require('./lib/tape-nock-setup');
var BBY = require('../bestbuy');

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
    t.false(data.categories[0].customerReviewCount, 'no review count');
    t.false(data.categories[0].customerReviewAverage, 'no review average');
    t.ok(data.categories[0].name, 'name returned');
    t.ok(data.categories[0].id, 'id returned');
  })
  .catch(function (err) {
    t.error(err);
  })
  .finally(t.end);
});
