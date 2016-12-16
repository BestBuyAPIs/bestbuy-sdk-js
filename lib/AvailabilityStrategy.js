'use strict';

var AvailabilityStrategy = function () {
  return function (sku, storeIds) {
    var options = {
      path: '/',
      qs: {}
    };

    if (typeof sku !== 'number' && typeof sku !== 'string') {
      return new Error('First parameter of "availability" must be the SKU, and it must be either a number or a string');
    }

    if (typeof storeIds !== 'number' && Array.isArray(storeIds) === false) {
      return new Error('Second parameter of "availability" must be store id(s), and it must be either a number or array of numbers');
    } else if (Array.isArray(storeIds)) {
      storeIds = storeIds.join(',');
    }

    if (arguments.length === 3) {
      options.qs = arguments[2];
    }
    if (arguments.length > 3) {
      return new Error('Unrecognized parameter length when calling "availability" method');
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
