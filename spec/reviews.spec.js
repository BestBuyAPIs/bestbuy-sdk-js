var bby = require('../bestbuy');
bby.init({
    key: process.env.BBY_API_KEY,
    url:'https://api.bestbuy.com/v1',
    debug:false,
    headers:{'User-Agent':'Reviews specs'}
});

//https://developer.bestbuy.com/documentation/products-api
describe('The Reviews section of the BBY API', function(){
	describe('Fetch reviews', function(){

        it('LIVE: Reviews search', function(done){
            
            // Product search for all items reviewed with exactly 4, show only name + sku
            bby.reviews('sku=1780275')
            .then(function(data) {
                data = JSON.parse(data);
                expect(data.reviews.length>0).toBe(true);
                expect(data.reviews[0].id).not.toBe(undefined);
                expect(data.reviews[0].sku).not.toBe(undefined);
                expect(data.reviews[0].reviewer).not.toBe(undefined);
                expect(data.reviews[0].rating).not.toBe(undefined);
            })
            .catch(function(err){
                expect(1).toBe(2);
            })
            .finally(done);
        });
    });
});