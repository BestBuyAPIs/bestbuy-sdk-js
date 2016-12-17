var BBY = require('../bestbuy');
var AVAILABLE_SKU = 4971901; // insignia AA batteries

var bby = BBY({
  key: process.env.BBY_API_KEY,
  debug: false,
  headers: {
    'User-Agent': 'Availability specs'
  }
});

// https://developer.bestbuy.com/documentation/products-api
describe('The Availability section of the BBY API', function () {
  describe('Fetch availability', function () {
    it('LIVE: Availability search', function (done) {
      bby.stores('area(55119,25)&storeType=BigBox')
                .then(function (data) {
                  expect(data.stores.length > 0).toBe(true);
                  var stores = data.stores.map(function (store) {
                    return store.storeId;
                  });
                  return bby.availability(AVAILABLE_SKU, stores);
                })
                .then(function (data) {
                  expect(data.products.length > 0).toBe(true);
                })
                .catch(function (err) {
                  expect(err).toBeUndefined();
                })
                .finally(done);
    });

    it('LIVE: Availability search using callback', function (done) {
      bby.stores('area(55119,25)&storeType=BigBox', function (err, data) {
        expect(err).toBeFalsy();
        expect(data.stores.length > 0).toBe(true);
        var stores = data.stores.map(function (store) {
          return store.storeId;
        });
        bby.availability(AVAILABLE_SKU, stores, function (err, data) {
          expect(err).toBeFalsy();
          expect(data.products.length > 0).toBe(true);
          done();
        });
      });
    });

    it('LIVE: Availability search using callback error', function (done) {
      bby.availability(AVAILABLE_SKU, 'blah', function (err, data) {
        expect(err).not.toBe(null);
        expect(err).toBe('Second parameter of "availability" must be store id(s), and it must be either a number or array of numbers');
        done();
      });
    });

    it('LIVE: Availability search using promises error', function (done) {
      bby.availability(AVAILABLE_SKU, 'blah')
                .then(function (data) {
                })
                .catch(function (err) {
                  expect(err).not.toBeUndefined();
                  expect(err).toBe('Second parameter of "availability" must be store id(s), and it must be either a number or array of numbers');
                })
                .finally(done);
    });
    it('LIVE: Availability search using promises sku error', function (done) {
      bby.availability({}, 'blah')
                .then(function (data) {})
                .catch(function (err) {
                  expect(err).not.toBeUndefined();
                  expect(err).toBe('First parameter of "availability" must be the SKU, and it must be either a number or a string');
                })
                .finally(done);
    });
    it('LIVE: Availability search using promises too many parameters error', function (done) {
      bby.availability(AVAILABLE_SKU, 123, 123, 123)
                .then(function (data) {})
                .catch(function (err) {
                  expect(err).not.toBeUndefined();
                  expect(err).toBe('Unrecognized parameter length when calling "availability" method');
                })
                .finally(done);
    });
  });
});
