var resource = require('./resource');

// Module configuration
var bby = {
    key: process.env.BBY_API_KEY,
    url: 'https://api.bestbuy.com/v1'
};

// Allow for global initialization of the module with an API key
bby.init = function(key, url) {
    bby.key = key;
    if (url) bby.url = url;
    return bby;
};

// Expose top-level resources from the BBY API
bby.products = resource('products', bby);
bby.stores = resource('stores', bby);
bby.reviews = resource('reviews', bby);
bby.categories = resource('categories', bby);
bby.availability = resource('availability', bby);
bby.openBoxProducts = resource('openBoxProducts', bby);

// Recommendations is a bit different
bby.recommendations = resource('recommendations', {
	key: bby.key,
	url: 'http://api.bestbuy.com/beta'
});

// Module config + REST resources is the public module interface
module.exports = bby;