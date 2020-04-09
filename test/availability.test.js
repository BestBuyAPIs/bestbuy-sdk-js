var test = require('./lib/tape-nock-setup');
var BBY = require('../');
var AVAILABLE_SKU = 4971901; // insignia AA batteries
var ANOTHER_AVAILABILE_SKU = 5670003; // nintendo switch

var bby = BBY({
  key: process.env.BBY_API_KEY || 'XXX',
  debug: false,
  headers: {
    'User-Agent': 'Availability tests'
  }
});

// https://developer.bestbuy.com/documentation/products-api
test('Availability search', test.opts, function (t) {
  bby.stores('area(55119,25)&storeType=Big Box')
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
    .then(t.end);
});

test('Availability search as xml', test.opts, function (t) {
  bby.stores('area(55119,50)&storeType=Big Box')
    .then(function (data) {
      t.ok(data.stores.length > 0, 'has stores');
      var stores = data.stores.map(function (store) {
        return store.storeId;
      });
      return bby.availability(ANOTHER_AVAILABILE_SKU, stores, { format: 'xml' });
    })
    .then(function (data) {
      t.ok(data.startsWith('<?xml'), 'xml string returned');
      t.ok(data.indexOf('product>') > -1, 'products returned');
    })
    .catch(function (err) {
      t.error(err);
    })
    .then(t.end);
});

test('Availability search using callback', test.opts, function (t) {
  bby.stores('area(55119,25)&storeType=Big Box', function (err, data) {
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
  bby.stores('area(55119,25)&storeType=Big Box', function (err, data) {
    t.error(err, 'no error');
    t.ok(data.stores.length > 0, 'has stores');
    var stores = data.stores.map(function (store) {
      return store.storeId;
    });
    bby.availability(AVAILABLE_SKU, stores, { show: 'all' }, function (err, data) {
      t.error(err, 'no error');
      t.equals(data.products[0].active, true, 'is active');
      t.ok(data.products.length > 0, 'has products');
      t.end();
    });
  });
});

test('Availability search using callback error', test.opts, function (t) {
  bby.availability(AVAILABLE_SKU, 'blah', function (err, data) {
    t.equals(err.message, 'Second parameter of "availability" must be store id(s), and it must be either a number or array of numbers');
    t.end();
  });
});

test('Availability search using promises error', test.opts, function (t) {
  bby.availability(AVAILABLE_SKU, 'blah')
    .catch(function (err) {
      t.ok(err, 'has error');
      t.equals(err.message, 'Second parameter of "availability" must be store id(s), and it must be either a number or array of numbers');
    })
    .then(t.end);
});

test('Availability search using promises sku error', test.opts, function (t) {
  bby.availability({}, 'blah')
    .then(function (data) {})
    .catch(function (err) {
      t.ok(err, 'has error');
      t.equals(err.message, 'First parameter of "availability" must be the SKU, and it must be either a number or a string');
    })
    .then(t.end);
});

test('Availability search using promises too many parameters error', test.opts, function (t) {
  bby.availability(AVAILABLE_SKU, 123, 123, 123)
    .then(function (data) {})
    .catch(function (err) {
      t.ok(err, 'has error');
      t.equals(err.message, 'Unrecognized parameter length when calling "availability" method');
    })
    .then(t.end);
});

test('Availability search as stream', test.opts, function (t) {
  bby.stores('area(55119,25)&storeType=Big Box', function (err, data) {
    t.error(err, 'no error');
    t.ok(data.stores.length > 0, 'has stores');
    var stores = data.stores.map(function (store) {
      return store.storeId;
    });

    var stream;
    try {
      stream = bby.availabilityAsStream(AVAILABLE_SKU, stores);
    } catch (err) {
      console.error(err);
      t.err(err);
      t.end();
    }

    var cnt = 0;
    var total;

    stream.on('data', data => {
      cnt++;
    });
    stream.on('total', (t) => { total = t; });

    stream.on('end', () => {
      t.equals(cnt, total, `data emitted matches total results (${cnt}/${total})`);
      t.end();
    });
  });
});

test('Availability search as xml stream', test.opts, function (t) {
  bby.stores('area(55119,25)&storeType=Big Box', function (err, data) {
    t.error(err, 'no error');
    t.ok(data.stores.length > 0, 'has stores');
    var stores = data.stores.map(function (store) {
      return store.storeId;
    });

    var stream;
    try {
      stream = bby.availabilityAsStream(ANOTHER_AVAILABILE_SKU, stores, { format: 'xml' });
    } catch (err) {
      console.error(err);
      t.err(err);
      t.end();
    }

    var cnt = 0;
    var total;

    stream.on('data', data => {
      cnt++;
    });
    stream.on('total', (t) => { total = t; });

    stream.on('end', () => {
      t.equals(cnt, total, `data emitted matches total results (${cnt}/${total})`);
      t.end();
    });
  });
});
