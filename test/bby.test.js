var test = require('./lib/tape-nock-setup');
var BestBuy = require('../');

function testProperties (t, BBY) {
  t.ok(BBY.options, 'has options');
  t.ok(BBY.options.key, 'has key');
  t.ok(BBY.availability instanceof Function, 'availability is a function');
  t.ok(BBY.openBox instanceof Function, 'openBox is a function');
  t.ok(BBY.categories instanceof Function, 'categories is a function');
  t.ok(BBY.products instanceof Function, 'products is a function');
  t.ok(BBY.recommendations instanceof Function, 'recommendations is a function');
  t.ok(BBY.stores instanceof Function, 'stores is a function');
}

test('Using type one initilization', test.opts, function (t) {
  var BBY = BestBuy(process.env.BBY_API_KEY || 'XXX');
  testProperties(t, BBY);
  t.end();
});

test('Using type two initilization', test.opts, function (t) {
  var BBY = BestBuy({
    key: process.env.BBY_API_KEY || 'XXX'
  });
  testProperties(t, BBY);
  t.end();
});

test('using type three initilization', test.opts, function (t) {
  var BBY = BestBuy({
    key: process.env.BBY_API_KEY || 'XXX'
  });
  testProperties(t, BBY);
  t.end();
});

test('Initialize with no key and use', test.opts, function (t) {
  t.throws(() => {
    var BBY = BestBuy({ key: false });
    BBY.products();
  }, /A Best Buy developer API key is required/);

  t.end();
});
