var test = require('./lib/tape-nock-setup');
var BBY = require('../');

var opts = {
  key: process.env.BBY_API_KEY || 'XXX',
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
  bby.stores('area(55119,25)&storeType=Big Box')
    .then(function (data) {
      t.ok(data.stores.length > 0, 'stores returned');
      t.end();
    });
});

test('Get a all stores', test.opts, function (t) {
  var bby = BBY(opts);
  // Do a query for stores
  bby.stores()
    .then(function (data) {
      t.ok(data.stores.length > 0, 'stores returned');
      t.end();
    });
});

test('Get a collection of stores as xml', test.opts, function (t) {
  var bby = BBY(opts);
  // Do a query for stores
  bby.stores('area(55119,25)&storeType=Big Box', { format: 'xml' })
    .then(function (data) {
      t.ok(data.startsWith('<?xml'), 'xml string returned');
      t.ok(data.indexOf('store>'), 'stores returned');
      t.end();
    });
});

test('Get a store', test.opts, function (t) {
  // Show details for one store
  var bby = BBY(opts);
  bby.stores(1443)
    .then(function (data) {
      t.equals(data.longName, 'Blaine', 'name is correct');
      t.equals(data.address, '10985 Ulysses St NE', 'address is correct');
      t.end();
    })
    .catch(err => t.error(err));
});

test('Get a store as xml', test.opts, function (t) {
  // Show details for one store
  var bby = BBY(opts);
  bby.stores(1443, { format: 'xml' })
    .then(function (data) {
      t.ok(data.startsWith('<?xml'), 'xml string returned');
      t.ok(data.indexOf('store>') > -1, 'stores returned');

      t.ok(data.indexOf('<longName>Blaine</longName>') > -1, 'name is correct');
      t.ok(data.indexOf('<address>10985 Ulysses St NE</address>') > -1, 'address is correct');
      t.end();
    })
    .catch(err => t.error(err));
});

test('Get stores as stream', test.opts, function (t) {
  var bby = BBY(opts);
  // Do a query for stores
  var stream = bby.storesAsStream('area(55119,25)&storeType=Big Box');

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

test('Get stores as xml stream', test.opts, function (t) {
  var bby = BBY(opts);
  // Do a query for stores
  var stream = bby.storesAsStream('area(55119,25)&storeType=Big Box', { format: 'xml' });

  var cnt = 0;
  var total;

  stream.on('data', data => {
    cnt++;
    t.ok(data.toString().match(/^<store>.*/), 'correct xml text present');
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

test('Get stores as stream - garbage data', test.opts, function (t) {
  var bby = BBY(opts);
  // Do a query for stores
  var stream = bby.storesAsStream('blah');

  stream.on('error', (err) => {
    t.ok(err.body.error.message.startsWith("Couldn't understand"), 'error returned');
    t.end();
  });
});
