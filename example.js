// Initialize with your Best Buy developer API key - if it is present as a
// system environment variable called BBY_API_KEY then that will be used
// automatically. We use it explicitly here so I don't check my API key into 
// version control :)
var bby = require('./index').init(process.env.BBY_API_KEY);

// If the environment variable is set, you would just do:
// var var bby = require('bestbuy');
// without the .init() call

// Do a query for stores
bby.stores('area(55119,25)&storeType=BigBox', function(err, data) {
    console.log('Store Search:');
    console.log('found %d stores.', data.stores.length);
    console.log('');
});

// Show details for one store
bby.stores(1443, function(err, data) {
    console.log('Store Details:');
    console.log(data.longName);
    console.log(data.address);
    console.log('');
});

// Product search for all items reviewed with exactly 4, show only name + sku
bby.products('customerReviewAverage=4', {
    show: 'name,sku'
}, function(err, data) {
    console.log('Product Search result number one:');
    console.log(data.products[0]);
    console.log('');
});

// Do a search which emits an error
bby.products('gurgleflats????4', function(err, data) {
    console.log('Here is what an error looks like:');
    console.log('HTTP Status Code: ' + err.code);
    console.log(err.message);
    console.log('There are %d examples of how to do it right', 
        err.examples.length);
    console.log('');
});