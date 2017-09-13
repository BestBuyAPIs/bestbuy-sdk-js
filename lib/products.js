module.exports = productsEndpoint;

function productsEndpoint (opts) {
  return function products (search, queryObj, callback) {
    if (typeof queryObj === 'function' && !callback) {
      callback = queryObj;
      queryObj = {};
    }
    if (typeof callback === 'undefined') callback = function noop () {};

    var bbyQuery = search.length > 0 ? `(${search})` : '';

    if (!isNaN(search) && typeof search === 'number') {
      // Resource ID
      bbyQuery = `/${search}.json`;
    }

    if (typeof queryObj === 'function') {
      var queryObjFuncErr = new Error('Unhandled parameter type');
      callback(queryObjFuncErr);
      return Promise.reject(queryObjFuncErr);
    }

    var url = `${opts.url}/v1/products${bbyQuery}`;

    return opts.apiService(url, queryObj, callback);
  };
}
