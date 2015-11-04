var resource = require('../lib/resource');

//https://developer.bestbuy.com/documentation/products-api
describe('The resource core of the BBY API Helper', function(){
	describe('basic operations', function(){
        it('Resource exists', function(done){
           
            this.options =  {
                                key: process.env.BBY_API_KEY,
                                url:'https://api.bestbuy.com/v1',
                                debug:false,
                                headers:{'User-Agent':'bestbuy-sdk-js'}
                            };
            var sut = resource('products', this.options);

            expect(sut).not.toBe(null);
            done();
        });
    });
});