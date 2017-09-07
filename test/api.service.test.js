var test = require('./lib/tape-nock-setup');
var BestBuy = require('../');

test('Ensure debug flag works', test.opts, function (t) {
  var bby = BestBuy({
    debug: true
  });

  bby.version().then(result => {
    t.ok(result, 'result returned');
    t.end();
  })
  .catch(err => t.error(err));
});

test('Ensure debug flag works with custom logging function', test.opts, function (t) {
  var debugObjs = [];

  var bbyWithDebugFn = BestBuy({
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
