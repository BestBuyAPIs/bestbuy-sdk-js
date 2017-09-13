module.exports = categoriesEndpoint;

function categoriesEndpoint (opts) {
  return function categories (search, queryObj, callback) {
    if (typeof queryObj === 'function') {
      callback = queryObj;
      queryObj = {};
    }
    if (typeof callback === 'undefined') callback = function noop () {};

    var bbyQuery = search.length > 0 ? `(${search})` : '';

    var url = `${opts.url}/v1/categories${bbyQuery}`;

    return opts.apiService(url, queryObj, callback);
  };
}
