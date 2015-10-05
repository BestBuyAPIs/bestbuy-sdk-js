# Best Buy API
This is a high-level JavaScript / Node.js helper for the Best Buy developer API. 

[![NPM](https://nodei.co/npm/bestbuy-sdk-js.png)](https://nodei.co/npm/bestbuy-sdk-js/)

The examples folder contains code that demonstrates how to include the module and initialize it with your Best Buy developer key and then programmatically call the API. 

Example of including the NPM module:

Pre-ES6 with explicit initialization

    var bby = require('bestbuy').init("your_BBY_API_KEY");

ES6 assuming an environment variable is set:

    import bby from 'bestbuy';

In addition to the examples, the package contains a suite of Jasmine tests to further show how to use the helper in more ways.

Finally, the package includes a sample React.js application using Flux architecture to demonstrate using the helper in a React-based web app served with Node.js.

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

## Run the React app
Open a terminal to run the Gulp tasks and enter:

    npm run gulp

Open another terminal and start the watch script so you can immediately have code changes trigger a rebuild

    npm run watch

Once the app is running (the watch window will print "Express server listening on port 3001"), open up a web browser and navigate to localhost:3001

## Online Resources
Best Buy Developer Portal: https://developer.bestbuy.com

Best Buy API Query Builder: https://github.com/BestBuyAPIs/bby-query-builder

Thinking in React: https://facebook.github.io/react/docs/thinking-in-react.html

Flux: https://facebook.github.io/flux/docs/overview.html

### LICENSE
MIT