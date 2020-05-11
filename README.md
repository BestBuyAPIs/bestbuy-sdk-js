# Best Buy API
This is a high-level JavaScript / Node.js helper for the [Best Buy developer API](https://developer.bestbuy.com/).

[![npm package](https://nodei.co/npm/bestbuy.png)](https://nodei.co/npm/bestbuy/)

[![Build status](https://img.shields.io/travis/BestBuyAPIs/bestbuy-sdk-js.svg?style=flat-square)](https://travis-ci.org/BestBuyAPIs/bestbuy-sdk-js)
[![Coverage Status](https://coveralls.io/repos/BestBuyAPIs/bestbuy-sdk-js/badge.svg?branch=master&service=github)](https://coveralls.io/github/BestBuyAPIs/bestbuy-sdk-js?branch=master)
[![Dependency Status](https://david-dm.org/BestBuyAPIs/bestbuy-sdk-js.svg)](https://david-dm.org/BestBuyAPIs/bestbuy-sdk-js)

The [examples](examples/) folder contains code that demonstrates how to include the module and initialize it with your Best Buy developer key and then programmatically call the API.

Example of including the NPM module:

Pre-ES6 with explicit initialization

```js
    var bby = require('bestbuy')("your_BBY_API_KEY");
```

In addition to the examples, the package contains a suite of Jasmine tests to further show how to use the helper in more ways.


## Getting Started
 1. Sign-up for a developer API Key at https://developer.bestbuy.com/
 2. Run `npm install bestbuy --save`
    * Alternatively you can just add `"bestbuy": "1.*"` inside of the *dependencies* part of your `package.json` file
 3. The library requires an API key to be provided before it can be used. You can set that in one of three ways:
    * Set an environment variable of `BBY_API_KEY` to your key and invoke the method<br>
      `var bby = require('bestbuy')();`
    * Send the key in as a string when invoking the method<br>
      `var bby = require('bestbuy')('YOURKEY');`
    * Send the key in as part of an object when invoking the method<br>
      `var bby = require('bestbuy')({'key': 'YOURKEY'});`


## Documentation

 - [`availability`](#availability)
 - [`real-time availability`](#real-time-availability)
 - [`categories`](#categories)
 - [`openBox`](#openbox)
 - [`products`](#products)
 - [`recommendations`](#recommendations)
 - [`stores`](#stores)
 - [`warranties`](#warranties)

In our documentation, we'll use a couple actual examples:

 - Whenever a SKU is referenced, we'll use `4312001`, which is the [Star Wars Episode IV: A New Hope (Blu-ray)](http://www.bestbuy.com/site/batman-begins-blu-ray-disc/4312001.p?id=48254&skuId=4312001)
 - Whenever a Store ID is referenced, we'll use `611` and `482`, which are respectfully the Best Buy stores by corporate headquarters and in New York where [Chloe](https://www.youtube.com/watch?v=rxTQxo6gKd4) works.

_More examples are available in the [examples](examples/) directory_

### Streams
Node.js streams are supported via these endpoints:
 - `availabilityAsStream`
 - `openBoxAsStream` (xml format not supported)
 - `categoriesAsStream`
 - `productsAsStream`
 - `storesAsStream`

For Streams:
  - ALL results will be returned.
  - Paginating and throttling is handled automatically!
  - For **json** format, the stream will be in `objectMode`, so each data chunk will be an object.
  - For **xml** format, the stream will return buffers, so each data chunk will be a buffer filled with exactly one object (exmaple: `<product><sku>123</sku></product>`)
    - If streaming xml directly into a file, be sure to add the xml pragma and wrap the stream in a root element or it won't be valid.
  - a `total` event will always be emitted once per stream with the total number of results.
  - a `data` event will be emitted for each item in the result (one per product/store/etc).
  - an `error` event will be emitted once `maxRetries` is exceeded.

### availability
#### `availability(sku, array of store ids[, query string object])`
This method supports an optional third parameter that represents extra attributes, such as `show`, to be added to the query string sent to the API.
##### Using Callbacks
```js
    var bby = require('bestbuy')('YOURKEY');
    bby.availability(4312001, [611, 482], function(err, data) {
        if (err) console.warn(err);
        else console.log('Stores carrying %s: %d', data.products[0].name, data.products[0].stores.length);
    });
```
##### Using Promises
```js
    var bby = require('bestbuy')('YOURKEY');
    bby.availability(4312001, [611, 482])
      .then(function(data){
        console.log('Stores carrying %s: %d', data.products[0].name, data.products[0].stores.length);
      })
      .catch(function(err){
        console.warn(err);
      });
```

##### Using Streams
```js
var stream = bby.availabilityAsStream(5670003, [611, 15, 6, 10, 7, 1055, 1000, 281, 245, 11, 8]);

stream.on('total', function (total) { console.log('Total Products: ' + total); });
stream.on('data', function (data) {
  console.log(`\nProduct "${data.name}" available at:\n${data.stores.map(store => ` - ${store.longName}`).join('\n')}`);
});
stream.on('error', function (error) {
  console.error(`Error status: ${error.status}`);
  console.error(`Error headers: ${error.headers}`);
  console.error(`Error body: ${error.body}`);
  console.error(`Error cause: ${error.cause}`);
})
```

### real-time availability
#### `realTimeAvailability(sku, {postalCode: postalCode}`
#### `realTimeAvailability(sku, {storeId: storeId}`
This method provides near real-time inventory levels for a sku. This endpoint only support JSON responses.

##### Using Callbacks
```js
bby.realTimeAvailability(4312001, {storeId: 611}, function (err, data) {
  if (err) console.warn(err);
  console.log(`Sku 4312001 in store pickup availability: ${data.ispuEligible}`);

  if(data.stores.length === 1) {
    console.log(`Sku 4312001 availability in the 611 store: ${JSON.stringify(data.stores[0])}`);
  } else {
    console.log(`Sku 4312001 is not available in the 611 store`);
  }
});
```
#### Using Promises
```js
bby.realTimeAvailability(4312001, {postalCode: 55454})
  .then(function(data) {
    console.log(`Sku 4312001 in store pickup availability: ${data.ispuEligible}`);

    if(data.stores.length > 0) {
      console.log(`Sku 4312001 availability in the 55454 area: ${JSON.stringify(data.stores)}`);
    } else {
      console.log(`Sku 4312001 is not available in the 55454 area`);
    }
  })
  .catch(function (err) {
    console.warn(err);
  });
```

### categories
#### `categories(String of search criteria[, query string object])`
This endpoint serves the search criteria for querying the [Category API as described in our API documentation](https://developer.bestbuy.com/documentation/categories-api).

The below example returns the first category with the word "music" in it.
##### Using Callbacks
```js
    var bby = require('bestbuy')('YOURKEY');
    bby.categories('(name=Music)', {pageSize: 1}, function(err, data) {
      if (err) console.warn(err);
      else if (data.total === 0) console.log('No categories found');
      else console.log('Found %d categories. First category (%s): %s', data.total, data.categories[0].id, data.categories[0].name);
    });
```
##### Using Promises
```js
    var bby = require('bestbuy')('YOURKEY');
    bby.categories('(name=Music)', {pageSize: 1})
      .then(function(data){
        if (data.total === 0) console.log('No categories found');
        else console.log('Found %d categories. First category (%s): %s', data.total, data.categories[0].id, data.categories[0].name);
      })
      .catch(function(err){
        console.warn(err);
      });
```

##### Using Streams
```js

// lets write all categories to a file called categories.json
var JSONStream = require('JSONStream');
var categories = bby.categoriesAsStream('');

// a "total" event is emitted so we know how many total products will be sent
categories.on('total', total => console.log(`Total Categories: ${total}`));

categories
  .pipe(JSONStream.stringify())
  .pipe(fs.createWriteStream('categories.json'));

// log when its done
categories.on('end', () => {
  console.log('Done!');
});

```

### openBox
#### `openBox(sku, array of store ids)`
This endpoint serves the search criteria for querying the [Buying Options API as described in our API documentation](https://developer.bestbuy.com/documentation/buyingOptions-api).

This example searches all open box products in the video games category, and returns the first result.
##### Using Callbacks
```js
    var bby = require('bestbuy')('YOURKEY');
    bby.openBox('categoryId=abcat0700000', function(err, data) {
      if (err) console.warn(err);
      else if (data.metadata.resultSet.count === 0) console.log('No Open Box products available');
      else {
        console.log('Found %d Open Box products', data.metadata.resultSet.count);
        console.log('First Open Box product:');
        console.log('\tName: %s', data.results[0].names.title);
        console.log('\tURL: %s', data.results[0].links.web);
        console.log('\tPrice: $%d', data.results[0].prices.current);
      }
    });
```
##### Using Promises
```js
    var bby = require('bestbuy')('YOURKEY');
    bby.openBox('categoryId=abcat0700000')
      .then(function(data){
        if (data.metadata.resultSet.count === 0) console.log('No Open Box products available');
        else {
          console.log('Found %d Open Box products', data.metadata.resultSet.count);
          console.log('First Open Box product:');
          console.log('\tName: %s', data.results[0].names.title);
          console.log('\tURL: %s', data.results[0].links.web);
          console.log('\tPrice: $%d', data.results[0].prices.current);
        }
      })
      .catch(function(data){
        console.warn(err);
      });
```
##### Using Streams
```js
var stream = bby.openBoxAsStream('categoryId=abcat0502000');
  stream.on('data', data => {});
  stream.on('total', (t) => { console.log('Total: ' + total) });
  stream.on('data', (t) => { console.log('Open box Item: ', data) });
```

### products
#### `products(String of search criteria[, query string object])`
This endpoint serves the search criteria for querying the [Products API as described in our API documentation](https://developer.bestbuy.com/documentation/products-api).

The below example returns the title and price of the first search result with the word "Mario" in it.
##### Using Callbacks
```js
    var bby = require('bestbuy')('YOURKEY');
    bby.products('(search=mario)', {show: 'salePrice,name', pageSize: 1}, function(err, data) {
      if (err) console.warn(err);
      else if (data.total === 0) console.log('No products found');
      else console.log('Found %d products. First match "%s" is $%d', data.total, data.products[0].name, data.products[0].salePrice);
    });
```
##### Using Promises
```js
    var bby = require('bestbuy')('YOURKEY');
    bby.products('(search=mario)', {show: 'salePrice,name', pageSize: 1})
      .then(function(data){
        if (data.total === 0) console.log('No products found');
        else console.log('Found %d products. First match "%s" is $%d', data.total, data.products[0].name, data.products[0].salePrice);
      })
      .catch(function(err){
        console.warn(err);
      });
```

##### Using Streams
```js
var productsStream = bby.productsAsStream('customerReviewAverage=5&name=red*', {
  show: 'name,sku'
});

// a "total" event is emitted so we know how many total products will be sent
productsStream.on('total', total => console.log(`Total Products: ${total}`));

// log each product to the console
productsStream.on('data', product => { console.log(`Product: ${JSON.stringify(product, null, 0)}`); });

// log when its done
productsStream.on('end', () => console.log('Done!'));

```

### recommendations
#### `recommendations('mostViewed' OR 'trendingViewed'[, optional category as a string])`
#### `recommendations('alsoViewed', sku)`
This endpoint serves the search criteria for querying the [Recommendations API as described in our API documentation](https://developer.bestbuy.com/documentation/recommendations-api).

The first parameter expects one of three values: mostViewed, trendingViewed or alsoViewed.
If the first parameter is *mostViewed* or *trendingViewed*, an optional second parameter of a categoryId may be provided.
If the first parameter is *alsoViewed*, a required second parameter of sku must be provided.

The below examples show how to get the most viewed products on BestBuy.com.
##### Using Callbacks
```js
    var bby = require('bestbuy')('YOURKEY');
    bby.recommendations('mostViewed', function(err, data) {
      if (err) console.warn(err);
      else if (data.metadata.resultSet.count === 0) console.log('Did not find any products');
      else console.log('Found %d products. First product: %s', data.metadata.resultSet.count, data.results[0].names.title);
    });
```
##### Using Promises
```js
    var bby = require('bestbuy')('YOURKEY');
    bby.recommendations('mostViewed')
      .then(function(data){
        if (data.metadata.resultSet.count === 0) console.log('Did not find any products');
        else console.log('Found %d products. First product: %s', data.metadata.resultSet.count, data.results[0].names.title);
      })
      .catch(function(err){
        console.warn(err);
      });
```
##### Using Streams
Streams are not supported for recommendations.

### stores
#### `stores(String of search criteria)`
This endpoint serves the search criteria for querying the [Stores API as described in our API documentation](https://developer.bestbuy.com/documentation/stores-api).

The below examples show the number of stores located within 25 miles of 94103 (San Francisco, CA).
##### Using Callbacks
```js
    var bby = require('bestbuy')('YOURKEY');
    bby.stores('area(94103,25)&storeType=BigBox', function(err, data){
      if (err) console.warn(err);
      else console.log('Number of stores found: ' + data.total);
    });
```
##### Using Promises
```js
    var bby = require('bestbuy')('YOURKEY');
    bby.stores('area(94103,25)&storeType=BigBox')
      .then(function(data){
        console.log('Number of stores found: ' + data.total);
      })
      .catch(function(err){
        console.warn(err);
      });
```
##### Using Streams
```js
  var bby = require('bestbuy')('YOURKEY');
  bby.storesAsStream('area(94103,25)&storeType=BigBox');

  stream.on('total', function (total) { console.log('Total Stores: ' + total); });
  stream.on('data', function (store) {
    console.log(`\Store: ${store.name} - Phone: ${store.phone}}`);
  });

```

### warranties
#### `warranties(sku)`
This endpoint serves warranties for a specified product per the [Warranties API as described in our API documentation](https://developer.bestbuy.com/documentation/stores-api).

The below examples show warranties for an old printer.
##### Using Callbacks
```js
    var bby = require('bestbuy')('YOURKEY');
    bby.warranties(6354884, function(err, data){
      if (err) console.warn(err);
      else console.log('Warranties found: ' + data.length);
    });
```
##### Using Promises
```js
    var bby = require('bestbuy')('YOURKEY');
    bby.warranties(6354884)
      .then(function(data){
        console.log('Warranties found: ' + data.length);
      })
      .catch(function(err){
        console.warn(err);
      });
```
##### Using Streams
Streams are not supported for warranties.

### version
#### `version()`
This endpoint will return the version of the API and this package version.

##### Using Callbacks
```js
    var bby = require('bestbuy')('YOURKEY');
    bby.version(function(err, data) {
      if (err) console.warn(err);
      else console.log(data);

      // output JSON:
      // { packageVersion: '2.0.0', apiVersion: '1.0.844' }
    });
```
##### Using Promises
```js
    var bby = require('bestbuy')('YOURKEY');
    bby.version().then(function(data) {
      console.log(version);
    })
    .catch(function(err){
      console.warn(err);
    });

    // output JSON:
    // { packageVersion: '2.0.0', apiVersion: '1.0.844' }
```
##### Using Streams
Streams are not supported.


## Enabling Debug Output
Debug can be enabled via the `debug` attribute:

```js
  var bby = require('bestbuy')({
    key: 'YOURKEY',
    debug: true
  });
  // output request and response info to console.log
```

If `console.log` is not desired, a custom debug function can be passed:
```js
  var bby = require('bestbuy')({
    key: 'YOURKEY',
    debug: function (debugObject) { myCustomLogging.info(debugObject) }
  });
  // The debug function will be called for each request, response, and error thrown by the internal HTTP client.
```

## Rate Limiting
In order to avoid `429 Too Many Requests` errors, all API calls are automatically throttled to 5 requests per second. This value aligns with the default limit for approved API keys. Setting a lower value can be useful if a key needs to be shared among multiple application instances.

If you need to adjust this value, it can be done via the `requestsPerSecond` option:
```js
  var bby = require('bestbuy')({
    key: 'YOURKEY',
    requestsPerSecond: 1 // just one request per second
  });
```

## Retries
By default, requests will be attempted only once before erroring. The maximum number of retries and the time taken between retries can be configured with the `maxRetries` and `retryInterval` options. `retryInterval` is set to 2000 by default.
```js
  var bby = require('bestbuy')({
    key: 'YOURKEY',
    maxRetries: 4, // make five requests at most
    retryInterval: 5000, // wait 5 seconds before retrying
  });
```

## Timeout
Request timeout can be configured with the `timeout` option. This value is set to 5000ms by default.
```js
  var bby = require('bestbuy')({
    key: 'YOURKEY',
    timeout: 15000 // wait for 15 seconds before erroring due to timeout
  });
```

## Tests
Run the existing tests with:
```bash
    npm test
```
Note that this uses nock fixtures to mock all network calls.

Run tests against the live API (BBY_API_KEY env var needs to be set):
```bash
    npm run test-live
```

If tests are added, re-record the mock fixtures:
```
   npm run record
   # tests will run against the live API and their output will be saved in test/fixtures
```


## Online Resources
 - [Best Buy Developer Portal](https://developer.bestbuy.com)
 - [Best Buy API Query Builder](https://github.com/BestBuyAPIs/bby-query-builder)
 - [Best Buy API Sample App](https://github.com/BestBuyAPIs/bestbuy-sdk-js-sample-app)


## LICENSE
[MIT](LICENSE)
