var BuyingOptionsStrategy = function() {

    return function() {
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
                options.path = '/products/' + arg + '/openBox';
            } else if (typeof arg === 'function') {
                // Result callback
                options.callback = arg;
            }
        }

        // Execute request
        return options;
    };
};

module.exports = BuyingOptionsStrategy;