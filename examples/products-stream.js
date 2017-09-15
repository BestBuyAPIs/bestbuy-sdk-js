// Initialize with your Best Buy developer API key - if it is present as a
// system environment variable called BBY_API_KEY then that will be used
// automatically. We use it explicitly here so I don't check my API key into
// version control :)
var bby = require('../')(process.env.BBY_API_KEY);

// Product search for all 5 star products with "red" in their name, show only name + sku
// returns a stream of all products (no pagination necessary!)

var productsStream = bby.productsAsStream('customerReviewAverage=5&name=red*', {
  show: 'name,sku'
});

// a "total" event is emitted so we know how many total products will be sent
productsStream.on('total', total => console.log(`Total Products: ${total}`));

// log each product to the console
productsStream.on('data', product => { console.log(`Product: ${JSON.stringify(product, null, 0)}`); });

// log when its done
productsStream.on('end', () => console.log('Done!'));
