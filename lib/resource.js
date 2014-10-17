var request = require('request');
var _ = require('lodash');

// Make an authenticated request against the given resource
function doRequest(resourceName, config, requestOptions) {
    // Throw if BBY API key has not been specified
    if (!config.key) {
        throw 'A Best Buy developer API key is required. Register for one at ' +
            'developer.bestbuy.com, call bestbuy.init(YOUR_API_KEY), or ' +
            'specify a BBY_API_KEY system environment variable.';
    }

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

    request({
        method: 'GET',
        url: url,
        qs: qs
    }, function(err, response, body) {
        // If they don't care, we don't care...
        if (!requestOptions.callback) return;

        try {

            if (typeof(response) === 'undefined') {
                return requestOptions.callback.call(undefined, err || (new Error('No response')));
            }

            if (err || response.statusCode >= 400) {
                var errorData = {};
                try {
                    errorData = JSON.parse(body);
                } catch(e) {
                    // Swallow, the API sends back HTML sometimes
                }

                requestOptions.callback.call(response, _.extend({
                    code: response.statusCode,
                    message: body
                }, errorData.error));
            } else {
                var data;
                if (body) {
                    data = JSON.parse(body);
                }

                if (requestOptions.callback) {
                    requestOptions.callback.call(response, err, data);
                }
            }
        } catch (e) {
            requestOptions.callback.call(null, e);
        }
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

        doRequest(resourceName, config, options);
    };

    return resource;
}

// Availability is a hacky join.
// It needs to be setup differently.
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

        doRequest(resourceName, config, options);
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
        doRequest(resourceName, config, options);
    };

    return resource;
};