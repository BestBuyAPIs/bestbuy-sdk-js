var resource = require('./resource');

// Module configuration
var bby = {
    key: process.env.BBY_API_KEY,
    url: 'https://api.remix.bestbuy.com/v1'
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
bby.recommendations = resource('recommendations', bby);

// Module config + REST resources is the public module interface
module.exports = bby;