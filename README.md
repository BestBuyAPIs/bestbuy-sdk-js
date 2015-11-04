# Best Buy API
This is a high-level JavaScript / Node.js helper for the Best Buy developer API. 

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
Sign-up for a developer API Key at http://developer.bestbuy.com/

Clone the repository.

    git clone https://github.com/BestBuyAPIs/bestbuy-sdk-js.git

Optionally export your key as an environment variable:  
in Windows:

    SET BBY_API_KEY=yourDeveloperApiKeyHere

on OS X or Linux:

	export BBY_API_KEY=yourDeveloperApiKeyHere

Install the dependencies with:
    
    npm install

***Many developers install gulp, grunt, bower, etc. globally. This package aliases the local node module to avoid problems when installing many global dependencies on CI servers, etc. In other words, to run this package, only running "npm install" is required. 
  
## Tests    
Run the existing tests with:

	npm test

## Online Resources
Best Buy Developer Portal: https://developer.bestbuy.com

Best Buy API Query Builder: https://github.com/BestBuyAPIs/bby-query-builder

Best Buy API Sample App: https://github.com/BestBuyAPIs/bestbuy-sdk-js-sample-app

### LICENSE
MIT 
