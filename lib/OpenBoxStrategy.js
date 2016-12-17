'use strict';

var OpenBoxStrategy = function () {
  return function (search) {
    var options = {
      path: '/products/openBox'
    };

    if (typeof search === 'number') {
      options.path = '/products/' + search + '/openBox';
    } else if (typeof search === 'string' && search.length > 0) {
            // Search is still a "sku", but was passed as a string
      if (!isNaN(parseInt(search))) {
        options.path = '/products/' + search + '/openBox';
      } else {
        options.path += '(' + search + ')';
      }
    }

    if (typeof arguments[1] !== 'undefined') {
      options.qs = arguments[1];
    }

        // Execute request
    return options;
  };
};

module.exports = OpenBoxStrategy;
