var request = require('request-promise');
var _ = require('lodash');

var Resource = function(strategy, config) {

    var config = config;
    var strategy = strategy;

    return function() {
        var requestOptions = strategy.apply(null, arguments);
        var callback = requestOptions.callback;

        // Throw if BBY API key has not been specified
        if (!config.key) {
            throw 'A Best Buy developer API key is required. Register for one at ' +
            'developer.bestbuy.com, call bestbuy.init(YOUR_API_KEY), or ' +
            'specify a BBY_API_KEY system environment variable.';
        }

        if (config.debug) {
            require('request-debug')(request);
        }

        // set up query string defaults
        var qs = _.extend({
            apiKey: config.key,
            format: 'json'
        }, requestOptions.qs);

        // Assemble request URL
        var url = config.url + requestOptions.path;
        if (requestOptions.query) {
            url = url + '(' + requestOptions.query + ')';
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
            headers: headers,
            json: true
        };

        return request(options)
            .then(function(body) {
                if (callback) {
                    callback(null, body);
                } else
                    return body;
            })
            .catch(function(err) {
                if (callback) {
                    callback(err);
                } else
                    return err;
            });
    };
};

module.exports = Resource;