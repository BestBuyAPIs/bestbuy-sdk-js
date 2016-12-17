var BBY = require('../bestbuy');

var bby = BBY({
  key: process.env.BBY_API_KEY,
  debug: false,
  headers: {
    'User-Agent': 'recommendations specs'
  }
});

var topTrendingSku;

// https://developer.bestbuy.com/documentation/products-api
describe('The recommendations section of the BBY API', function () {
  describe('Fetch recommendations', function () {
    it('LIVE: recommendations search', function (done) {
            // Figure out the current top trending product
      bby.recommendations('trendingViewed')
                .then(function (data) {
                  expect(data.results.length > 0).toBe(true);
                  topTrendingSku = data.results[0].sku;
                  return bby.products(+topTrendingSku);
                })
                .then(function (data) {
                  expect(parseInt(data.sku)).toBe(parseInt(topTrendingSku));
                })
                .catch(function (err) {
                  expect(err).toBeUndefined();
                })
                .finally(done);
    });

    it('LIVE: recommendations search using callbacks', function (done) {
            // Figure out the current top trending product
      bby.recommendations('trendingViewed', function (err, data) {
        expect(err).toBeFalsy();
        expect(data.results.length > 0).toBe(true);
        topTrendingSku = data.results[0].sku;
        bby.products(+topTrendingSku, function (err, data) {
          expect(err).toBeFalsy();
          expect(parseInt(data.sku)).toBe(parseInt(topTrendingSku));
          done();
        });
      });
    });

    it('LIVE: recommendations search also viewed', function (done) {
            // Figure out the current top trending product
      bby.recommendations('alsoViewed', 1780275)
                .then(function (data) {
                  expect(data.results.length > 0).toBe(true);
                })
                .catch(function (err) {
                  expect(err).toBeFalsy();
                })
                .finally(done);
    });

    it('LIVE: recommendations search also viewed error', function (done) {
            // Figure out the current top trending product
      bby.recommendations('alsoViewed')
                .then(function (data) {
                })
                .catch(function (err) {
                  expect(err).toBe('Recommendations endpoint requires 2nd parameter to be a SKU for the "alsoViewed" method');
                })
                .finally(done);
    });
  });
});
