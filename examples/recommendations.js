// Initialize with your Best Buy developer API key - if it is present as a
// system environment variable called BBY_API_KEY then that will be used
// automatically. We use it explicitly here so I don't check my API key into 
// version control :)
var bby = require('./index').init(process.env.BBY_API_KEY);

// If the environment variable is set, you would just do:
// var var bby = require('bestbuy');
// without the .init() call

// Figure out the current top trending product
bby.recommendations('trendingViewed', function(err, data) {
    var topTrendingSku = data.results[0].sku;
    bby.products(+topTrendingSku, function (err, data) {
        console.log('This is the top trending product right now:');
        console.log(data);
    });
});