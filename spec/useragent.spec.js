var BBY = require('../bestbuy');
var pkg = require('../package.json')

var bby = BBY();

//https://developer.bestbuy.com/documentation/products-api
describe('User-Agent matches package version', function() {
   it('has the correct version in User-Agent', function(done) {
    console.log(bby.options.headers['User-Agent'])
        expect(bby.options.headers['User-Agent']).toBe('bestbuy-sdk-js/' + pkg.version + ';nodejs');
        done();
    })
});
