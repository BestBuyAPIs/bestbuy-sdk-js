var SmartListsStrategy = function() {

    return function() {
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

        // Execute request
        return options;
    };
};

module.exports = SmartListsStrategy;