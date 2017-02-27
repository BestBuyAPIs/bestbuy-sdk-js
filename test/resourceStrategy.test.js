var test = require('./lib/tape-nock-setup');
var Resource = require('../lib/Resource');
var Default = require('../lib/DefaultStrategy');

test('Fetch categories using Resource', test.opts, function (t) {
  var options = {
    key: process.env.BBY_API_KEY,
    url: 'https://api.bestbuy.com/v1',
    debug: false,
    headers: {
      'User-Agent': 'bestbuy-sdk-js'
    }
  };
  var categories = new Resource(new Default('categories'), options);
  categories('', {
    show: 'name,id'
  })
  .then(function (data) {
    t.ok(data.categories.length > 0, 'categories returned');
    var cat = data.categories[0];
    t.equals(cat.customerReviewCount, undefined, 'first category review count is not defined');
    t.equals(cat.customerReviewAverage, undefined, 'first category review average is not defined');
    t.ok(cat.name, 'first category has a name');
    t.ok(cat.id, 'first category has an id');
    t.end();
  })
  .catch(function (err) {
    t.error(err);
    t.end();
  });
});
