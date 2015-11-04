var bby = require('../bestbuy');
bby.init({
    key: process.env.BBY_API_KEY,
    debug:false,
    headers:{'User-Agent':'recommendations specs'}
});

var topTrendingSku;

//https://developer.bestbuy.com/documentation/products-api
describe('The recommendations section of the BBY API', function(){
	describe('Fetch recommendations', function(){

        it('LIVE: recommendations search', function(done){

			// Figure out the current top trending product
			bby.recommendations('trendingViewed')
			.then(function(data){
				data = JSON.parse(data);
				expect(data.results.length>0).toBe(true);
			    topTrendingSku = data.results[0].sku;
			    return bby.products(+topTrendingSku);
			})
			.then(function(data){
	                data = JSON.parse(data);
	                expect(parseInt(data.sku)).toBe(parseInt(topTrendingSku));
	        })
	        .catch(function(err){
	            expect(1).toBe(2);
	        })
	        .finally(done);
        });

        it('LIVE: recommendations search using callbacks', function(done){

			// Figure out the current top trending product
			bby.recommendations('trendingViewed',function(data){
				data = JSON.parse(data);
				expect(data.results.length>0).toBe(true);
			    topTrendingSku = data.results[0].sku;
			    bby.products(+topTrendingSku,function(data){
	                data = JSON.parse(data);
	                expect(parseInt(data.sku)).toBe(parseInt(topTrendingSku));
	                done();
	            });
	        });
        });

    });
});