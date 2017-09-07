// Initialize with your Best Buy developer API key - if it is present as a
// system environment variable called BBY_API_KEY then that will be used
// automatically. We use it explicitly here so I don't check my API key into
// version control :)
var bby = require('../')(process.env.BBY_API_KEY);

// Do a query for stores
bby.stores('area(55119,25)&storeType=BigBox', function (err, data) {
  if (err) console.error(err);
  console.log('Store Search:');
  console.log('found %d stores.', data.stores.length);
  console.log('');
});

// Show details for one store
bby.stores(1443, function (err, data) {
  if (err) console.error(err);
  console.log('Store Details:');
  console.log(data.longName);
  console.log(data.address);
  console.log('');
});
