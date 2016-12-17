var test = require('./lib/tape-nock-setup');
var Default = require('../lib/DefaultStrategy');

// https://developer.bestbuy.com/documentation/products-api
test('Default Strategy - Resource exists', function (t) {
  var options = new Default('categories')(123, {
    show: 'name,id'
  });
  t.equals(options.id, 123, 'correct id');
  t.equals(options.path, '/categories', 'correct path');
  t.equals(options.qs.show, 'name,id', 'correct qs.show');
  t.end();
});
