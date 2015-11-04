var request = require('request-promise');
var _ = require('lodash');

function setLogging(debug) {
    if(debug) {
        require('request-debug')(request);
    }
    else {
        require('request-debug')(request);
        //This method doesn't exist until debugging has been invoked. That's why the line above is required first.
        request.stopDebugging();
    }
}

// Make an authenticated request against the given resource
function doRequest(resourceName, config, requestOptions) {
    // Throw if BBY API key has not been specified
    if (!config.key) {
        throw 'A Best Buy developer API key is required. Register for one at ' +
            'developer.bestbuy.com, call bestbuy.init(YOUR_API_KEY), or ' +
            'specify a BBY_API_KEY system environment variable.';
    }

    setLogging(config.debug);

    // set up query string defaults
    var qs = _.extend({
        apiKey: config.key,
        format: 'json'
    }, requestOptions.qs);

    // Assemble request URL
    var url = config.url+requestOptions.path;
    if (requestOptions.query) {
        url = url + '('+ requestOptions.query +')';
    }
    if (requestOptions.id) {
        url = url + '/' + requestOptions.id + '.json';
        // sending a format for a specific resource results in a 400 :/
        delete qs.format;
    }

    var headers = {};
    if (config.headers instanceof Object)
        headers = config.headers;

    var options = {
        uri: url,
        qs: qs,
        headers: headers
    };
    return request(options)
        .then(function(body){
            if (requestOptions.callback) {
                requestOptions.callback.call(null, body);
            }
            else
                return body;
        })
        .catch(function(err){
            if (requestOptions.callback) {
                requestOptions.callback.call(err);
            }
            else
                return err;
        });
}

// Recommendations is designed differently from the other APIS.
// It needs to be setup differently.
function buildRecommendations(resourceName, config) {
    var skulessMethods = ['mostViewed', 'trendingViewed'];
    var skuMethods = ['alsoViewed', 'similar'];
    var resource = function() {
        
        var options = {
            path: '/products'
        };

        var method;

        for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if (_.contains(skulessMethods, arg)) {
                options.id = arg;
            } else if (_.contains(skuMethods, arg)) {
                method = arg;
                if (options.id) {
                    options.id = options.id + '/' + arg;
                }
            } else if (!isNaN(arg) && typeof arg === 'number') {
                // SKU
                options.id = arg;
                if (method) {
                    options.id = arg + '/' + method;
                }
            } else if (typeof arg === 'function') {
                // Result callback
                options.callback = arg;
            } else {
                // Assume any object literal is a set of query params
                options.qs = arg;
            }
        }

        return doRequest(resourceName, config, options);
    };

    return resource;
}

// Availability needs to be setup differently.
function buildAvailability(resourceName, config) {
    var resource = function() {

        var sku;
        var storeIds;
        var options = {
            path: '/',
            qs: {}
        };

        var method;

        for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if (!isNaN(arg) && typeof arg === 'number') {
                // SKU
                sku = arg;
            } else if (Array.isArray(arg)) {
                // Store IDs
                storeIds = arg.join(',');
            } else if (typeof arg === 'function') {
                // Result callback
                options.callback = arg;
            } else {
                // Assume any object literal is a set of query params
                options.qs = arg;
            }
        }

        if (!options.qs.show) {
            options.qs.show = 'name,sku,stores';
        }

        options.path = '/products(sku='+sku+')+stores(storeId in('+storeIds+'))';

        return doRequest(resourceName, config, options);
    };

    return resource;
}

// Buyingoptions needs to be setup differently.
function buildBuyingOptions(resourceName, config) {
    var resource = function() {
        
        var options = {
            path: '/products/openBox'
        };
        // process arguments
        for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if (typeof arg === 'string') {
                // The BBY query language string for this request
                options.query = arg;
            } else if (!isNaN(arg) && typeof arg === 'number') {
                // Resource ID
                options.path = '/products/'+arg+'/openBox';
            } else if (typeof arg === 'function') {
                // Result callback
                options.callback = arg;
            } 
        }

        return doRequest(resourceName, config, options);
    };

    return resource;
}

// Smart Lists needs to be setup differently.
function buildSmartLists(resourceName, config) {
    var resource = function() {
        
        var options = {
            path: '/products/'
        };
        // process arguments
        for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if (typeof arg === 'string') {
                // The BBY query language string for this request
                options.path += arg;
            } else if (typeof arg === 'function') {
                // Result callback
                options.callback = arg;
            } 
        }

        return doRequest(resourceName, config, options);
    };

    return resource;
}

// Return a function which can query the given resource
module.exports = function(resourceName, config) {

    // The public resource API
    // setup the special cases
    if (resourceName === 'recommendations') {
        return buildRecommendations(resourceName, config);
    } else if (resourceName === 'availability') {
        return buildAvailability(resourceName, config);
    } else if (resourceName === 'buyingOptions') {
        return buildBuyingOptions(resourceName, config);
    } else if (resourceName === 'smartLists') {
        return buildSmartLists(resourceName, config);
    }

    var resource = function() {

        var options = {
            path: '/'+resourceName
        };

        // process arguments
        for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if (typeof arg === 'string') {
                // The BBY query language string for this request
                options.query = arg;
            } else if (!isNaN(arg) && typeof arg === 'number') {
                // Resource ID
                options.id = arg;
            } else if (typeof arg === 'function') {
                // Result callback
                options.callback = arg;
            } else {
                // Assume any object literal is a set of query params
                options.qs = arg;
            }
        }

        // Execute request
        return doRequest(resourceName, config, options);
    };

    return resource;
};