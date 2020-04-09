module.exports = recommendationsEndpoint;

function recommendationsEndpoint (opts) {
  return function recommendations (path, criteria, callback) {
    if (typeof criteria === 'function' && !callback) {
      callback = criteria;
      criteria = null;
    }

    var url;

    if (path === 'alsoViewed') {
      if (typeof criteria !== 'string' && typeof criteria !== 'number') {
        var criteriaErr = new Error('Recommendations endpoint requires 2nd parameter to be a SKU for the "' + path + '" method');
        if (callback) {
          callback(criteriaErr);
        }
        return Promise.reject(criteriaErr);
      }
      url = `${opts.url}/beta/products/${criteria}/alsoViewed`;
    } else if (path === 'trendingViewed' || path === 'mostViewed') {
      if (typeof criteria === 'function') {
        var criteriaFuncErr = new Error('Unhandled parameter type');
        if (callback) {
          callback(criteriaFuncErr);
        }
        return Promise.reject(criteriaFuncErr);
      }
      url = `${opts.url}/beta/products/${path}`;
    } else {
      var pathErr = new Error(`Unrecognized path "${path}"`);
      if (callback) {
        callback(pathErr);
      }
      return Promise.reject(pathErr);
    }

    return opts.apiService({ url }, callback);
  };
}
