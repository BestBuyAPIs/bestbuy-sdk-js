# Best Buy API
This is a high-level JavaScript / Node.js helper for the [Best Buy developer API](https://developer.bestbuy.com/).

[![npm package](https://nodei.co/npm/bestbuy.png)](https://nodei.co/npm/bestbuy/)

[![Build status](https://img.shields.io/travis/BestBuyAPIs/bestbuy-sdk-js.svg?style=flat-square)](https://travis-ci.org/BestBuyAPIs/bestbuy-sdk-js)
[![Coverage Status](https://coveralls.io/repos/BestBuyAPIs/bestbuy-sdk-js/badge.svg?branch=master&service=github)](https://coveralls.io/github/BestBuyAPIs/bestbuy-sdk-js?branch=master)
[![Dependency Status](https://david-dm.org/BestBuyAPIs/bestbuy-sdk-js.svg)](https://david-dm.org/BestBuyAPIs/bestbuy-sdk-js)

The examples folder contains code that demonstrates how to include the module and initialize it with your Best Buy developer key and then programmatically call the API.

Example of including the NPM module:

Pre-ES6 with explicit initialization

    var bby = require('bestbuy').init("your_BBY_API_KEY");

ES6 assuming an environment variable is set:

    import bby from 'bestbuy';

In addition to the examples, the package contains a suite of Jasmine tests to further show how to use the helper in more ways.


## Getting Started
Sign-up for a developer API Key at https://developer.bestbuy.com/

Clone the repository.

    git clone https://github.com/BestBuyAPIs/bestbuy-sdk-js.git

Optionally export your key as an environment variable:
in Windows:

    SET BBY_API_KEY=yourDeveloperApiKeyHere

on OS X or Linux:

    export BBY_API_KEY=yourDeveloperApiKeyHere

Install the dependencies with:

    npm install

_Many developers install gulp, grunt, bower, etc. globally. This package aliases the local node module to avoid problems when installing many global dependencies on CI servers, etc. In other words, to run this package, only running `npm install` is required._


## Tests
Run the existing tests with:

    npm test


## Documentation

 - [`availability`](#availability)
 - [`buyingOptions`](#buyingOptions)
 - [`categories`](#categories)
 - [`products`](#products)
 - [`recommendations`](#recommendations)
 - [`reviews`](#reviews)
 - [`smartLists`](#smartLists)
 - [`stores`](#stores)

In our documentation, we'll use a couple actual examples:

 - Whenever a SKU is referenced, we'll use `8880044`, which is the [Batman Begins (Blu-ray)](http://www.bestbuy.com/site/batman-begins-blu-ray-disc/8880044.p?id=1484301&skuId=8880044)
 - Whenever a Store ID is referenced, we'll use `482`, which a Best Buy store in New York where [Chloe](https://www.youtube.com/watch?v=rxTQxo6gKd4) works.

_More examples are available in the `examples` directory_

<a name="availability" />
### availability(sku, array of store ids)
#### Using Callbacks
#### Using Promises

<a name="buyingOptions" />
### buyingOptions(sku, array of store ids)
#### Using Callbacks
#### Using Promises

<a name="categories" />
### categories(sku, array of store ids)
#### Using Callbacks
#### Using Promises

<a name="products" />
### products(sku, array of store ids)
#### Using Callbacks
#### Using Promises

<a name="recommendations" />
### recommendations(sku, array of store ids)
#### Using Callbacks
#### Using Promises

<a name="reviews" />
### reviews(sku, array of store ids)
#### Using Callbacks
#### Using Promises

<a name="smartLists" />
### smartLists(sku, array of store ids)
#### Using Callbacks
#### Using Promises

<a name="stores" />
### stores(sku, array of store ids)
#### Using Callbacks
#### Using Promises



## Online Resources
 - [Best Buy Developer Portal](https://developer.bestbuy.com)
 - [Best Buy API Query Builder](https://github.com/BestBuyAPIs/bby-query-builder)
 - [Best Buy API Sample App](https://github.com/BestBuyAPIs/bestbuy-sdk-js-sample-app)


## LICENSE
[MIT](LICENSE)