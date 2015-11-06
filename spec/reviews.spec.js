var BBY = require('../bestbuy');

var bby = BBY({
    key: process.env.BBY_API_KEY,
    debug: false,
    headers: {
        'User-Agent': 'Reviews specs'
    }
});

//https://developer.bestbuy.com/documentation/products-api
describe('The Reviews section of the BBY API', function() {
    describe('Fetch reviews', function() {
        it('LIVE: Reviews search', function(done) {
            bby.reviews('sku=1780275')
                .then(function(data) {
                    expect(data.reviews.length > 0).toBe(true);
                    expect(data.reviews[0].id).not.toBe(undefined);
                    expect(data.reviews[0].sku).not.toBe(undefined);
                    expect(data.reviews[0].reviewer).not.toBe(undefined);
                    expect(data.reviews[0].rating).not.toBe(undefined);
                })
                .catch(function(err) {
                    expect(err).toBeUndefined();
                })
                .finally(done);
        });
    });
});