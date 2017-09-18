// Initialize with your Best Buy developer API key - if it is present as a
// system environment variable called BBY_API_KEY then that will be used
// automatically. We use it explicitly here so I don't check my API key into
// version control :)
var bby = require('../')(process.env.BBY_API_KEY);

// Product search for all items reviewed with exactly 4, show only name + sku
bby.products('customerReviewAverage=4', {
  show: 'name,sku',
  format: 'xml'
}, function (err, data) {
  if (err) console.error(err);
  console.log('Product Search result as xml:');
  console.log(data);
});

// Product search for all items reviewed with exactly 4, show only name + sku
bby.products(1000002573, {
  show: 'name,sku',
  format: 'xml'
}, function (err, data) {
  if (err) console.error(err);
  console.log('Product Search result as xml:');
  console.log(data);
});
