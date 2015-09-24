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