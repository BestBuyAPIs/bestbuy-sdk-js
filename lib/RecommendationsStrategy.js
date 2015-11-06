var _ = require('lodash');

var RecommendationsStrategy = function() {

    return function() {
        var skulessMethods = ['mostViewed', 'trendingViewed'];
        var skuMethods = ['alsoViewed', 'similar'];
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
                return new Error('Unhandled parameter type');
            } else {
                // Assume any object literal is a set of query params
                options.qs = arg;
            }
        }

        // Execute request
        return options;

    };

};

module.exports = RecommendationsStrategy;