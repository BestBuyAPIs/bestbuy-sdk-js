var test = require('./lib/tape-nock-setup');
var BBY = require('../bestbuy');

var bby = BBY({
  key: process.env.BBY_API_KEY,
  debug: false,
  headers: {
    'User-Agent': 'Warranties tests'
  }
});

test('Get a warranty for a product', test.opts, function (t) {
  // Do a query for stores
  bby.warranties(6354884)
  .then(function (data) {
    t.ok(data.length > 0, 'warranties returned');
    t.end();
  });
});
