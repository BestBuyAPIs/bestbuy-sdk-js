# Best Buy API
This is a high-level JavaScript / Node.js helper for the Best Buy developer API. 

The examples folder contains code that demonstrates how to include the core NPM export and initialize it with your Best Buy developer key. 

Example:

    var bby = require('./bestbuy').init(process.env.BBY_API_KEY);


In addition to the examples, the package contains a suite Jasmine tests to further show how to use the helper in more ways.

Finally, the package includes a sample React.js application using Flux architecture to demonstrate using the helper in a React-based web app served with Node.js.

## Getting Started
Sign-up for a developer API Key at http://developer.bestbuy.com/

Fork and clone the repository.

Export your key as an environment variable:  

	export BBY_API_KEY=yourDeveloperApiKeyHere

Install the dependencies with:
    
    npm install

You will also need Bower, Gulp and Nodemon. If you don't have these then:

    npm i -g bower
    npm i -g gulp
    npm i -g nodemon

## Tests    
Run the existing tests with:

	npm test

## Run the React app
Install bower dependencies

    bower install
   
Open a terminal.

    gulp

Open another terminal

    npm run watch

## Online Resources
Best Buy Developer Portal: https://developer.bestbuy.com

Thinking in React: https://facebook.github.io/react/docs/thinking-in-react.html

Flux: https://facebook.github.io/flux/docs/overview.html

### LICENSE
MIT