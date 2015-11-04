var bby = require('../bestbuy');
bby.init({
    key: process.env.BBY_API_KEY,
    url:'https://api.bestbuy.com/v1',
    debug:false,
    headers:{'User-Agent':'Smart lists specs'}
});

//https://developer.bestbuy.com/documentation/products-api
describe('The smart lists section of the BBY API', function(){
	describe('Fetch buying options', function(){

        it('LIVE: Smart lists', function(done){
            
            // Product search for all items reviewed with exactly 4, show only name + sku
            bby.smartLists('connectedHome', {
               show: 'name,sku'
            })
            .then(function(data) {
                data = JSON.parse(data);
                expect(data.results.length>0).toBe(true);
                expect(data.results[0].customerReviews.count).not.toBe(undefined);
            })
            .catch(function(err){
                expect(1).toBe(2);
            })
            .finally(done);
        });

        it('LIVE: Smart lists using callbacks', function(done){
            
            // Product search for all items reviewed with exactly 4, show only name + sku
            bby.smartLists('connectedHome', {
               show: 'name,sku'
            }, function(data) {
                data = JSON.parse(data);
                expect(data.results.length>0).toBe(true);
                expect(data.results[0].customerReviews.count).not.toBe(undefined);
                done();
            });
        });
    });
});