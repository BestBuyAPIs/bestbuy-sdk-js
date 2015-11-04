var bby = require('../bestbuy');
bby.init({
    key: process.env.BBY_API_KEY,
    debug:false,
    headers:{'User-Agent':'Availability specs'}
});

//https://developer.bestbuy.com/documentation/products-api
describe('The Availability section of the BBY API', function(){
	describe('Fetch availability', function(){
        it('LIVE: Availability search', function(done){
            
            bby.stores('area(55119,25)&storeType=BigBox')
            .then(function(data) {
                data = JSON.parse(data);
                expect(data.stores.length>0).toBe(true);
                var stores = data.stores.map(function(store){
                    return store.storeId;
                });
                return bby.availability(1780275,stores);
            })          
            .then(function(data) {
                data = JSON.parse(data);
                expect(data.products.length>0).toBe(true);
            })
            .catch(function(err){
                expect(1).toBe(2);
            })
            .finally(done);
        });

        it('LIVE: Availability search using callback', function(done){
            
            bby.stores('area(55119,25)&storeType=BigBox', function(data) {
                    data = JSON.parse(data);
                    expect(data.stores.length>0).toBe(true);
                    var stores = data.stores.map(function(store){
                        return store.storeId;
                    });
                    bby.availability(1780275,stores,function(data) {
                            data = JSON.parse(data);
                            expect(data.products.length>0).toBe(true);
                            done();
                        });
            });
        });
    });
});