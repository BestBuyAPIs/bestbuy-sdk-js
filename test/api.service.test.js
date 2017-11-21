var test = require('./lib/tape-nock-setup');
var BestBuy = require('../');

test('Ensure debug flag works', test.opts, function (t) {
  var bby = BestBuy({
    key: process.env.BBY_API_KEY || 'XXX',
    debug: true
  });

  bby.version().then(result => {
    t.ok(result, 'result returned');
    t.end();
  })
  .catch(err => t.error(err));
});

test('Ensure debug flag works with streams', test.opts, function (t) {
  var bby = BestBuy({
    key: process.env.BBY_API_KEY || 'XXX',
    debug: true
  });

  var stream = bby.productsAsStream('sku=5758400');
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

test('Ensure debug flag works with custom logging function', test.opts, function (t) {
  var debugObjs = [];

  var bbyWithDebugFn = BestBuy({
    key: process.env.BBY_API_KEY || 'XXX',
    debug: (data) => {
      debugObjs.push(data);
    }
  });

  bbyWithDebugFn.version().then(result => {
    t.ok(result, 'result returned');
    t.equals(debugObjs.length, 2, 'custom log called twice');

    t.ok(debugObjs[0].request, 'request log JSON object is present');
    t.ok(debugObjs[1].response, 'response log JSON object is present');
    t.end();
  })
  .catch(err => t.error(err));
});
