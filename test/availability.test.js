var test = require('./lib/tape-nock-setup');
var BBY = require('../bestbuy');
var AVAILABLE_SKU = 4971901; // insignia AA batteries

var bby = BBY({
  key: process.env.BBY_API_KEY,
  debug: false,
  headers: {
    'User-Agent': 'Availability tests'
  }
});

// https://developer.bestbuy.com/documentation/products-api
test('Availability search', test.opts, function (t) {
  bby.stores('area(55119,25)&storeType=BigBox')
  .then(function (data) {
    t.ok(data.stores.length > 0, 'has stores');
    var stores = data.stores.map(function (store) {
      return store.storeId;
    });
    return bby.availability(AVAILABLE_SKU, stores);
  })
  .then(function (data) {
    t.ok(data.products.length > 0, 'has products');
  })
  .catch(function (err) {
    t.error(err);
  })
  .finally(t.end);
});

test('Availability search using callback', test.opts, function (t) {
  bby.stores('area(55119,25)&storeType=BigBox', function (err, data) {
    t.error(err, 'no error');
    t.ok(data.stores.length > 0, 'has stores');
    var stores = data.stores.map(function (store) {
      return store.storeId;
    });
    bby.availability(AVAILABLE_SKU, stores, function (err, data) {
      t.error(err, 'no error');
      t.ok(data.products.length > 0, 'has products');
      t.end();
    });
  });
});

test('Availability search using callback and third argument', test.opts, function (t) {
  bby.stores('area(55119,25)&storeType=BigBox', function (err, data) {
    t.error(err, 'no error');
    t.ok(data.stores.length > 0, 'has stores');
    var stores = data.stores.map(function (store) {
      return store.storeId;
    });
    bby.availability(AVAILABLE_SKU, stores, {show: 'all'}, function (err, data) {
      t.error(err, 'no error');
      t.equals(data.products[0].active, true, 'is active');
      t.ok(data.products.length > 0, 'has products');
      t.end();
    });
  });
});

test('Availability search using callback error', test.opts, function (t) {
  bby.availability(AVAILABLE_SKU, 'blah', function (err, data) {
    t.equals(err, 'Second parameter of "availability" must be store id(s), and it must be either a number or array of numbers');
    t.end();
  });
});

test('Availability search using promises error', test.opts, function (t) {
  bby.availability(AVAILABLE_SKU, 'blah')
  .catch(function (err) {
    t.ok(err, 'has error');
    t.equals(err, 'Second parameter of "availability" must be store id(s), and it must be either a number or array of numbers');
  })
  .finally(t.end);
});

test('Availability search using promises sku error', test.opts, function (t) {
  bby.availability({}, 'blah')
  .then(function (data) {})
  .catch(function (err) {
    t.ok(err, 'has error');
    t.equals(err, 'First parameter of "availability" must be the SKU, and it must be either a number or a string');
  })
  .finally(t.end);
});

test('Availability search using promises too many parameters error', test.opts, function (t) {
  bby.availability(AVAILABLE_SKU, 123, 123, 123)
  .then(function (data) {})
  .catch(function (err) {
    t.ok(err, 'has error');
    t.equals(err, 'Unrecognized parameter length when calling "availability" method');
  })
  .finally(t.end);
});
