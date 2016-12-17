var test = require('./lib/tape-nock-setup');
var BBY = require('../bestbuy');

var opts = {
  key: process.env.BBY_API_KEY,
  debug: false,
  headers: {
    'User-Agent': 'Stores tests'
  }
};

// http://developer.bestbuy.com/documentation/stores-api
test('Create new instance', test.opts, function (t) {
  var bby = BBY(opts);
  t.ok(bby, 'created instance successfully');
  t.end();
});

test('Get a collection of stores', test.opts, function (t) {
  var bby = BBY(opts);
  // Do a query for stores
  bby.stores('area(55119,25)&storeType=BigBox')
    .then(function (data) {
      t.ok(data.stores.length > 0, 'stores returned');
      t.end();
    });
});

test('Get a store', test.opts, function (t) {
  // Show details for one store
  var bby = BBY(opts);
  bby.stores(1443)
    .then(function (data) {
      t.equals(data.longName, 'Best Buy - Blaine', 'name is correct');
      t.equals(data.address, '10985 Ulysses St Ne', 'address is correct');
      t.end();
    });
});
