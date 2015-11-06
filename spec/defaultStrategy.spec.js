var Default = require('../lib/DefaultStrategy');

//https://developer.bestbuy.com/documentation/products-api
describe('The resource core of the BBY API Helper', function() {
    describe('default strategy', function() {
        it('Resource exists', function(done) {

            var options = new Default('categories')(123, {
                show: 'name,id'
            });
            expect(options.id).toBe(123);
            expect(options.path).toBe('/categories');
            expect(options.qs.show).toBe('name,id');
            done();
        });
    });
});