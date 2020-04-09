var test = require('./lib/tape-nock-setup');
var BBY = require('../');

var bby = BBY({
  key: process.env.BBY_API_KEY || 'XXX',
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

test('Fetch all categories as xml', test.opts, function (t) {
  // Product search for all items reviewed with exactly 4, show only name + sku
  bby.categories('', {
    show: 'name,id',
    format: 'xml'
  })
    .then(function (data) {
      t.ok(data.startsWith('<?xml'), 'xml string returned');
      t.ok(data.indexOf('category>') > -1, 'categories returned');
      t.end();
    })
    .catch(function (err) {
      t.error(err);
    });
});

test('Fetch Categories with name and page size and callback', test.opts, function (t) {
  // Product search for all items reviewed with exactly 4, show only name + sku
  bby.categories('(name=Video Games)', { pageSize: 1 }, function (err, data) {
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

test('Fetch categories as stream', test.opts, function (t) {
  // Product search for all items reviewed with exactly 4, show only name + sku

  var stream;
  try {
    stream = bby.categoriesAsStream('name="V*"', { show: 'name' });
  } catch (err) {
    console.error(err);
    t.error(err);
    t.end();
  }

  var cnt = 0;
  var total;

  stream.on('data', data => {
    t.deepEquals(Object.keys(data), ['name'], 'correct keys returned');
    cnt++;
  });
  stream.on('total', (t) => { total = t; });

  stream.on('error', err => {
    t.error(err);
    t.end();
  });

  stream.on('end', () => {
    t.equals(cnt, total, `data emitted matches total results (${cnt}/${total})`);
    t.end();
  });
});

test('Fetch categories as xml stream', test.opts, function (t) {
  // Product search for all items reviewed with exactly 4, show only name + sku

  var stream;
  try {
    stream = bby.categoriesAsStream('name="V*"', { format: 'xml' });
  } catch (err) {
    console.error(err);
    t.error(err);
    t.end();
  }

  var cnt = 0;
  var total;

  stream.on('data', data => {
    t.ok(data.toString().match(/^<category>.*/), 'correct xml text present');
    cnt++;
  });
  stream.on('total', (t) => { total = t; });

  stream.on('error', err => {
    t.error(err);
    t.end();
  });

  stream.on('end', () => {
    t.equals(cnt, total, `data emitted matches total results (${cnt}/${total})`);
    t.end();
  });
});
