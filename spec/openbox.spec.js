var BBY = require('../bestbuy');

var bby = BBY({
    key: process.env.BBY_API_KEY,
    debug: false,
    headers: {
        'User-Agent': 'Buying options specs'
    }
});

//https://developer.bestbuy.com/documentation/products-api
describe('The buying options section of the BBY API', function() {
    describe('Fetch buying options', function() {

        it('LIVE: Buying options search for all items', function(done) {

            // Product search for all items reviewed with exactly 4, show only name + sku
            bby.openBox(null, {
                    show: 'name,sku'
                })
                .then(function(data) {
                    expect(data.results.length > 0).toBe(true);
                    expect(data.results[0].customerReviews.count).not.toBe(undefined);
                    expect(data.results[0].customerReviews.averageScore).not.toBe(undefined);
                    expect(data.results[0].names).not.toBe(undefined);
                    expect(data.results[0].offers.length > 0).toBe(true);
                })
                .catch(function(err) {
                    expect(err).toBeUndefined();
                })
                .finally(done);
        });

        it('LIVE: Buying options search for one item', function(done) {

            // Product search for all items reviewed with exactly 4, show only name + sku
            bby.openBox(8610161)
                .then(function(data) {
                    expect(data.results.length > 0).toBe(true);
                    expect(data.results[0].customerReviews.count).not.toBe(undefined);
                    expect(data.results[0].customerReviews.averageScore).not.toBe(undefined);
                    expect(data.results[0].names).not.toBe(undefined);
                    expect(data.results[0].offers.length > 0).toBe(true);
                })
                .catch(function(err) {
                    expect(err).toBeUndefined();
                })
                .finally(done);
        });


        it('LIVE: Buying options search for one item using callback', function(done) {

            // Product search for all items reviewed with exactly 4, show only name + sku
            bby.openBox(8610161, function(err, data) {
                expect(data.results.length > 0).toBe(true);
                expect(data.results[0].customerReviews.count).not.toBe(undefined);
                expect(data.results[0].customerReviews.averageScore).not.toBe(undefined);
                expect(data.results[0].names).not.toBe(undefined);
                expect(data.results[0].offers.length > 0).toBe(true);
                done();
            });
        });
    });
});