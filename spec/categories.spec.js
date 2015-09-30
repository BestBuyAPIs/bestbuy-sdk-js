var bby = require('../bestbuy');

//https://developer.bestbuy.com/documentation/products-api
describe('The categories section of the BBY API', function(){
	describe('Fetch categories', function(){
		it('LIVE: Return all categories', function(done){

			// Product search for all items reviewed with exactly 4, show only name + sku
			bby.categories('', {
    			show: 'name,id'
			}, function(err, data) {
    		expect(data.categories.length>0).toBe(true);
    		expect(data.categories[0].customerReviewCount).toBe(undefined);
    		expect(data.categories[0].customerReviewAverage).toBe(undefined);
    		expect(data.categories[0].name).not.toBe(undefined);
    		expect(data.categories[0].id).not.toBe(undefined);
    		done();
			});
		});
	});
});