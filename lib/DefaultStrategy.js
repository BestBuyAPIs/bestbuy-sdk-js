'use strict';

var DefaultStrategy = function (resourceName) {
  return function () {
    var options = {
      path: '/' + resourceName
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
        return new Error('Unhandled parameter type');
      } else if (arg !== null && arg !== undefined) {
                // Assume any object literal is a set of query params
        options.qs = arg;
      }
    }

        // Execute request
    return options;
  };
};

module.exports = DefaultStrategy;
