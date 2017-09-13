module.exports = productsEndpoint;

function productsEndpoint (opts) {
  return function products (search, params, callback) {
    if (typeof params === 'function' && !callback) {
      callback = params;
      params = {};
    }

    if (typeof callback === 'undefined') callback = function noop () {};

    if (typeof params === 'function') {
      var queryObjFuncErr = new Error('Unhandled parameter type');
      callback(queryObjFuncErr);
      return Promise.reject(queryObjFuncErr);
    }

    var bbyQuery = search.length > 0 ? `(${search})` : '';

    if (!isNaN(search) && typeof search === 'number') {
              // Resource ID
      bbyQuery = `/${search}.json`;
    }
    var url = `${opts.url}/v1/products${bbyQuery}`;

    return opts.apiService({url, params}, callback);
  };
}
