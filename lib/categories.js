module.exports = categoriesEndpoint;

function categoriesEndpoint (opts) {
  return function categories (search, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = {};
    }
    if (typeof callback === 'undefined') callback = function noop () {};

    var bbyQuery = search.length > 0 ? `(${search})` : '';

    var url = `${opts.url}/v1/categories${bbyQuery}`;

    return opts.apiService({url, params}, callback);
  };
}
