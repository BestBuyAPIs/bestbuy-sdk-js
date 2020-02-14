// Initialize with your Best Buy developer API key - if it is present as a
// system environment variable called BBY_API_KEY then that will be used
// automatically. We use it explicitly here so I don't check my API key into
// version control :)
var bby = require('../')(process.env.BBY_API_KEY);

// Product search for all items reviewed with exactly 4, show only name + sku
bby.products('customerReviewAverage=4', {
  show: 'name,sku'
}, function (err, data) {
  if (err) console.error(err);
  console.log('Product Search result number one:');
  console.log(data.products[0]);
  console.log('');
});

// Do a search which emits an error
bby.products('gurgleflats????4', function (err, data) {
  console.log('Here is what an error looks like:');
  console.log('HTTP Status Code: ' + err.status);
  console.log('Response body: ' + JSON.stringify(err.body));
  console.log('');
});

bby.products('manufacturer=canon&salePrice<1000', {
  format: 'json',
  show: 'sku,name,salePrice'
}, function (err, data) {
  if (err) console.error(err);
  console.log(data.products[0]);
});
