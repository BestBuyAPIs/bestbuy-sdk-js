var Resource = require('../lib/Resource');
var Default = require('../lib/DefaultStrategy');

//https://developer.bestbuy.com/documentation/products-api
describe('The resource core of the BBY API Helper', function() {
    describe('basic operations', function() {
        it('Resource exists', function(done) {

            this.options = {
                key: process.env.BBY_API_KEY,
                url: 'https://api.bestbuy.com/v1',
                debug: false,
                headers: {
                    'User-Agent': 'bestbuy-sdk-js'
                }
            };
            var categories = new Resource(new Default('categories'), this.options);
            categories('', {
                    show: 'name,id'
                })
                .then(function(data) {
                    expect(data.categories.length > 0).toBe(true);
                    expect(data.categories[0].customerReviewCount).toBe(undefined);
                    expect(data.categories[0].customerReviewAverage).toBe(undefined);
                    expect(data.categories[0].name).not.toBe(undefined);
                    expect(data.categories[0].id).not.toBe(undefined);
                })
                .finally(done);
        });
    });
});