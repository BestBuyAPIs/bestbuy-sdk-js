# Best Buy API
This is a high-level JavaScript / Node.js helper for the [Best Buy developer API](https://developer.bestbuy.com/).

[![npm package](https://nodei.co/npm/bestbuy.png)](https://nodei.co/npm/bestbuy/)

[![Build status](https://img.shields.io/travis/BestBuyAPIs/bestbuy-sdk-js.svg?style=flat-square)](https://travis-ci.org/BestBuyAPIs/bestbuy-sdk-js)
[![Coverage Status](https://coveralls.io/repos/BestBuyAPIs/bestbuy-sdk-js/badge.svg?branch=master&service=github)](https://coveralls.io/github/BestBuyAPIs/bestbuy-sdk-js?branch=master)
[![Dependency Status](https://david-dm.org/BestBuyAPIs/bestbuy-sdk-js.svg)](https://david-dm.org/BestBuyAPIs/bestbuy-sdk-js)

The [examples](examples/) folder contains code that demonstrates how to include the module and initialize it with your Best Buy developer key and then programmatically call the API.

Example of including the NPM module:

Pre-ES6 with explicit initialization

    var bby = require('bestbuy')("your_BBY_API_KEY");

In addition to the examples, the package contains a suite of Jasmine tests to further show how to use the helper in more ways.


## Getting Started
 1. Sign-up for a developer API Key at https://developer.bestbuy.com/
 2. Run `npm install bestbuy --save`
    * Alternatively you can just add `"bestbuy": "1.*"` inside of the *dependencies* part of your `package.json` file
 3. The library requires an API key to be provided before it can be used. You can set that in one of three ways:
    * Set an environment variable of `BBY_API_KEY` to your key
    * Send the key in as a string when invoking the method<br>
      `var bby = require('bestbuy')('YOURKEY');`
    * Send the key in as part of an object when invoking the method<br>
      `var bby = require('bestbuy')({'key': 'YOURKEY'});`


## Documentation

 - [`availability`](#availability)
 - [`buyingOptions`](#buyingOptions)
 - [`categories`](#categories)
 - [`products`](#products)
 - [`recommendations`](#recommendations)
 - [`reviews`](#reviews)
 - [`stores`](#stores)

In our documentation, we'll use a couple actual examples:

 - Whenever a SKU is referenced, we'll use `4312001`, which is the [Star Wars Episode IV: A New Hope (Blu-ray)](http://www.bestbuy.com/site/batman-begins-blu-ray-disc/4312001.p?id=48254&skuId=4312001)
 - Whenever a Store ID is referenced, we'll use `611` and `482`, which are respectfully the Best Buy stores by corporate headquarters and in New York where [Chloe](https://www.youtube.com/watch?v=rxTQxo6gKd4) works.

_More examples are available in the [examples](examples/) directory_

<a name="availability" />
### availability(sku, array of store ids[, query string object])
This method supports an optional third parameter that represents extra attributes, such as `show`, to be added to the query string sent to the API.
#### Using Callbacks
    var bby = require('bestbuy')('YOURKEY');
    bby.availability(4312001, [611, 482], function(err, data) {
        if (err) console.warn(err);
        else console.log('Stores carrying %s: %d', data.products[0].name, data.products[0].stores.length);
    });
#### Using Promises
    var bby = require('bestbuy')('YOURKEY');
    bby.availability(4312001, [611, 482])
      .then(function(data){
        console.log('Stores carrying %s: %d', data.products[0].name, data.products[0].stores.length);
      })
      .catch(function(err){
        console.warn(err);
      });

<a name="buyingOptions" />
### buyingOptions(sku, array of store ids)
This endpoint serves the search criteria for querying the [Buying Options API as described in our API documentation](https://developer.bestbuy.com/documentation/buyingOptions-api).
#### Using Callbacks
    var bby = require('bestbuy')('YOURKEY');
#### Using Promises
    var bby = require('bestbuy')('YOURKEY');

<a name="categories" />
### categoroies(String of search criteria[, query string object])
This endpoint serves the search criteria for querying the [Category API as described in our API documentation](https://developer.bestbuy.com/documentation/categories-api).

The below example returns the first category with the word "music" in it.
#### Using Callbacks
    var bby = require('bestbuy')('YOURKEY');
    bby.categories('(name=Music)', {pageSize: 1}, function(err, data) {
      if (err) console.warn(err);
      else if (data.total === 0) console.log('No categories found');
      else console.log('Found %d categories. First category (%s): %s', data.total, data.categories[0].id, data.categories[0].name);
    });
#### Using Promises
    var bby = require('bestbuy')('YOURKEY');
    bby.categories('(name=Music)', {pageSize: 1})
      .then(function(data){
        if (data.total === 0) console.log('No categories found');
        else console.log('Found %d categories. First category (%s): %s', data.total, data.categories[0].id, data.categories[0].name);
      })
      .catch(function(err){
        console.warn(err);
      });

<a name="products" />
### products(String of search criteria[, query string object])
This endpoint serves the search criteria for querying the [Products API as described in our API documentation](https://developer.bestbuy.com/documentation/products-api).

The below example returns the title and price of the first search result with the word "Mario" in it.
#### Using Callbacks
    var bby = require('bestbuy')('YOURKEY');
    bby.products('(search=mario)', {show: 'salePrice,name', pageSize: 1}, function(err, data) {
      if (err) console.warn(err);
      else if (data.total === 0) console.log('No products found');
      else console.log('Found %d products. First match "%s" is $%d', data.total, data.products[0].name, data.products[0].salePrice);
    });
#### Using Promises
    var bby = require('bestbuy')('YOURKEY');
    bby.products('(search=mario)', {show: 'salePrice,name', pageSize: 1})
      .then(function(data){
        if (data.total === 0) console.log('No products found');
        else console.log('Found %d products. First match "%s" is $%d', data.total, data.products[0].name, data.products[0].salePrice);
      })
      .catch(function(err){
        console.warn(err);
      });

<a name="recommendations" />
### recommendations('mostViewed' OR 'trendingViewed'[, optional category as a string])
### recommendations('alsoViewed' OR 'similar', sku)
This endpoint serves the search criteria for querying the [Recommendations API as described in our API documentation](https://developer.bestbuy.com/documentation/recommendations-api).

The first parameter expects one of four values: mostViewed, trendingViewed, alsoViewed or similar
If the first parameter is *mostViewed* or *trendingViewed*, an optional second parameter of a categoryId may be provided.
If the first parameter is *alsoViewed* or *similar*, a required second parameter of sku must be provided.

The below examples show how to get the most viewed products on BestBuy.com.
#### Using Callbacks
    var bby = require('bestbuy')('YOURKEY');
    bby.recommendations('mostViewed', function(err, data) {
      if (err) console.warn(err);
      else if (data.metadata.resultSet.count === 0) console.log('Did not find any products');
      else console.log('Found %d products. First product: %s', data.metadata.resultSet.count, data.results[0].names.title);
    });

#### Using Promises
    var bby = require('bestbuy')('YOURKEY');
    bby.recommendations('mostViewed')
      .then(function(data){
        if (data.metadata.resultSet.count === 0) console.log('Did not find any products');
        else console.log('Found %d products. First product: %s', data.metadata.resultSet.count, data.results[0].names.title);
      })
      .catch(function(err){
        console.warn(err);
      });

<a name="reviews" />
### reviews(String of search criteria)
This endpoint serves the search criteria for querying the [Reviews API as described in our API documentation](https://developer.bestbuy.com/documentation/reviews-api).

The below examples show finding the reviews for a specific product.
#### Using Callbacks
    var bby = require('bestbuy')('YOURKEY');
    bby.reviews('sku=4312001', function(err, data) {
      if (err) console.warn(err);
      else if (data.total === 0) console.log('No reviews found');
      else console.log('Found %d reviews, first review: %s', data.total, data.reviews[0].comment);
    });

#### Using Promises
    var bby = require('bestbuy')('YOURKEY');
    bby.reviews('sku=4312001')
      .then(function(data){
        if (data.total === 0) console.log('No reviews found');
        else console.log('Found %d reviews, first review: %s', data.total, data.reviews[0].comment);
      })
      .catch(function(err){
        console.warn(err);
      });


<a name="stores" />
### stores(String of search criteria)
This endpoint serves the search criteria for querying the [Stores API as described in our API documentation](https://developer.bestbuy.com/documentation/stores-api).

The below examples show the number of stores located within 25 miles of 94103 (San Francisco, CA).
#### Using Callbacks
    var bby = require('bestbuy')('YOURKEY');
    bby.stores('area(94103,25)&storeType=BigBox', function(err, data){
      if (err) console.warn(err);
      else console.log('Number of stores found: ' + data.total);
    });
#### Using Promises
    var bby = require('bestbuy')('YOURKEY');
    bby.stores('area(94103,25)&storeType=BigBox')
      .then(function(data){
        console.log('Number of stores found: ' + data.total);
      })
      .catch(function(err){
        console.warn(err);
      });


## Tests
Run the existing tests with:

    npm test


## Online Resources
 - [Best Buy Developer Portal](https://developer.bestbuy.com)
 - [Best Buy API Query Builder](https://github.com/BestBuyAPIs/bby-query-builder)
 - [Best Buy API Sample App](https://github.com/BestBuyAPIs/bestbuy-sdk-js-sample-app)


## LICENSE
[MIT](LICENSE)