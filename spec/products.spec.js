var bby = require('../bestbuy');

//https://developer.bestbuy.com/documentation/products-api
describe('The products section of the BBY API', function(){
	describe('Fetch products', function(){
		it('Product search for all items reviewed with exactly 4, show only name + sku', function(done){

			// Product search for all items reviewed with exactly 4, show only name + sku
			bby.products('customerReviewAverage=4', {
    			show: 'name,sku'
			}, function(err, data) {
    		console.log('Product Search result number one:');
    		console.log(data.products[0]);
    		console.log('');
    		expect(data.products.length>0).toBe(true);
    		expect(data.products[0].customerReviewCount).toBe(undefined);
    		expect(data.products[0].customerReviewAverage).toBe(undefined);
    		expect(data.products[0].name).not.toBe(undefined);
    		expect(data.products[0].sku).not.toBe(undefined);
    		done();
			});
		});
	});
});