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
                return new Error('Unhandled parameter type');
            }
        }

        // Execute request
        return options;
    };
};

module.exports = SmartListsStrategy;