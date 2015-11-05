var AvailabilityStrategy = function() {

    return function() {
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

        options.path = '/products(sku=' + sku + ')+stores(storeId in(' + storeIds + '))';

        // Execute request
        return options;
    };
};

module.exports = AvailabilityStrategy;