var test = require('./lib/tape-nock-setup');
var BBY = require('../bestbuy');

var bby = BBY({
  key: process.env.BBY_API_KEY,
  debug: false,
  headers: {
    'User-Agent': 'Reviews tests'
  }
});

// https://developer.bestbuy.com/documentation/products-api
test('Reviews search', test.opts, function (t) {
  bby.reviews('sku=2557948')
    .then(function (data) {
      t.ok(data.reviews.length > 0, 'reviews returned');
      t.ok(data.reviews[0].id, 'first review has an id');
      t.equals(data.reviews[0].sku, 2557948, 'first review has correct sku');
      t.ok(data.reviews[0].reviewer, 'first review has a reviewer');
      t.ok(data.reviews[0].rating, 'first review has a rating');
      t.end();
    })
    .catch(function (err) {
      t.error(err);
      t.end();
    });
});
