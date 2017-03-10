'use strict';

var RecommendationsStrategy = function () {
  return function (path, criteria) {
    var options = {
      path: '/products'
    };

    if (path === 'mostViewed' || path === 'trendingViewed') {
      options.path += '/' + path;
      if (typeof criteria === 'string') {
        options.path += '(categoryId=' + criteria + ')';
      }
    } else if (path === 'alsoViewed') {
      if (typeof criteria !== 'string' && typeof criteria !== 'number') {
        return new Error('Recommendations endpoint requires 2nd parameter to be a SKU for the "' + path + '" method');
      }
      options.path += '/' + criteria + '/' + path;
    } else {
      return new Error('Unrecognized path "' + path + '"');
    }

    if (typeof arguments[arguments.length - 1] === 'object') {
      options.qs = arguments[arguments.length - 1];
    }
    if (typeof arguments[arguments.length - 1] === 'function') {
      return new Error('Unhandled parameter type');
    }

        // Execute request
    return options;
  };
};

module.exports = RecommendationsStrategy;
