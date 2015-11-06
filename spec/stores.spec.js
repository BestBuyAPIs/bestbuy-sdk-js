var BBY = require('../bestbuy');

var bby = BBY({
    key: process.env.BBY_API_KEY,
    debug: false,
    headers: {
        'User-Agent': 'Stores specs'
    }
});


//http://developer.bestbuy.com/documentation/stores-api
describe('The stores section of the BBY API', function() {
    describe('init', function() {
        it('Is not null', function() {
            expect(bby).not.toBe(undefined);
        });
    });

    describe('LIVE: Get a collection of stores', function() {
        it('Can retrieve stores', function(done) {
            // Do a query for stores
            bby.stores('area(55119,25)&storeType=BigBox')
                .then(function(data) {
                    expect(data.stores.length > 0).toBe(true);
                })
                .finally(done);
        });
    });

    describe('LIVE: Get a store', function() {
        it('Can retrieve a store', function(done) {
            // Show details for one store
            bby.stores(1443)
                .then(function(data) {
                    expect(data.longName).toBe("Best Buy - Blaine");
                    expect(data.address).toBe("10985 Ulysses St Ne");
                })
                .finally(done);
        });
    });
});