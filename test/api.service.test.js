const axios = require('axios');
const sinon = require('sinon');

const test = require('./lib/tape-nock-setup');
const apiServiceFactory = require('../lib/api.service');
const rateLimiter = require('../lib/rate-limiter');
const BestBuy = require('../');

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

test('Ensure it can retry', test.opts, function (t) {
  const rateLimiterStub = sinon.stub(rateLimiter, 'rateLimiter');
  const spy = sinon.spy();
  const axiosStub = sinon.stub(axios, 'create').returns(data => {
    spy();
    const error = new Error('Service Unavailable');
    error.response = { status: 503 };
    return Promise.reject(error);
  });
  const apiService = apiServiceFactory({ maxRetries: 2, retryInterval: 0 });

  apiService({}, null)
    .then(() => {
      t.fail('should not resolve');
      axiosStub.restore();
      rateLimiterStub.restore();
      t.end();
    }).catch(() => {
      t.pass('should reject');
      t.equals(spy.callCount, 3, 'should attempt call three times');
      axiosStub.restore();
      rateLimiterStub.restore();
      t.end();
    });
});
