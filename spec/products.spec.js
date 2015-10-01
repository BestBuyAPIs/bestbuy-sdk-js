var bby = require('../bestbuy');

//https://developer.bestbuy.com/documentation/products-api
describe('The products section of the BBY API', function(){
	describe('Fetch products', function(){
		it('LIVE: Product search for all items reviewed with exactly 4, show only name + sku', function(done){

			// Product search for all items reviewed with exactly 4, show only name + sku
			bby.products('customerReviewAverage=4', {
    			show: 'name,sku'
			}, function(err, data) {
    		expect(data.products.length>0).toBe(true);
    		expect(data.products[0].customerReviewCount).toBe(undefined);
    		expect(data.products[0].customerReviewAverage).toBe(undefined);
    		expect(data.products[0].name).not.toBe(undefined);
    		expect(data.products[0].sku).not.toBe(undefined);
    		done();
			});
		});

        it('LIVE: Product search with paging', function(done){

            // Product search for all items reviewed with exactly 4, show only name + sku
            bby.products('type=Movie', {
                show: 'name,sku',
                pageSize:5,
                page:2
            }, function(err, data) {
            expect(data.products.length>0).toBe(true);
            expect(data.products[0].customerReviewCount).toBe(undefined);
            expect(data.products[0].customerReviewAverage).toBe(undefined);
            expect(data.products[0].name).not.toBe(undefined);
            expect(data.products[0].sku).not.toBe(undefined);
            expect(data.from).toBe(6);
            expect(data.currentPage).toBe(2);
            done();
            });
        });

        it('LIVE: Product search beginning with * should fail', function(done){

            // Product search for all items reviewed with exactly 4, show only name + sku
            bby.products('name=***phone*', {
                show: 'name,sku'
            }, function(err, data) {
            expect(data).toBe(undefined);
            expect(err.code).toBe(400);
            done();
            });
        });

        it('LIVE: Is a garbage search', function(done){

            // Do a search which emits an error
            bby.products('gurgleflats????4', function(err, data) {
            expect(err.code).toBe(400);
            done();
            });
        });

        it('LIVE: Search multiple attributes and filter', function(done){
            bby.products('manufacturer=canon&salePrice<1000', {
                format:'json',
                show: 'sku,name,salePrice'
            }, function(err,data) {
                expect(data.products[0].customerReviewCount).toBe(undefined);
                expect(data.products[0].customerReviewAverage).toBe(undefined);
                expect(data.products[0].name).not.toBe(undefined);
                expect(data.products[0].sku).not.toBe(undefined);
                expect(data.products[0].salePrice).not.toBe(undefined);
                done();
            });
        });
	});
});