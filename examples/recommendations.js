// Initialize with your Best Buy developer API key - if it is present as a
// system environment variable called BBY_API_KEY then that will be used
// automatically. We use it explicitly here so I don't check my API key into
// version control :)
var BBY = require('../');
var bby = BBY({
  key: process.env.BBY_API_KEY,
  url: 'https://api.bestbuy.com/v1',
  debug: true,
  headers: {
    'User-Agent': 'recommendations example'
  },
  maxRetries: 3,
  retryInterval: 1000
});

// Figure out the current top trending product
bby.recommendations('trendingViewed', function (err, data) {
  if (err) console.error(err);
  var topTrendingSku = data.results[0].sku;
  bby.products(+topTrendingSku, function (err, data) {
    if (err) console.error(err);
    console.log('This is the top trending product right now:');
    console.log(data);
  });
});
