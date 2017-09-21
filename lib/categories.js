module.exports = categoriesEndpoint;

function categoriesEndpoint (opts) {
  return {categories, categoriesAsStream};

  function categories (search, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = {};
    }
    if (typeof callback === 'undefined') callback = function noop () {};

    return opts.apiService(prepareRequest(search, params), callback);
  }

  function categoriesAsStream (search, params) {
    return opts.apiStreamService('categories.*', prepareRequest(search, params));
  }

  function prepareRequest (search, params) {
    var bbyQuery = (search && search.length > 0) ? `(${search})` : '';
    var url = `${opts.url}/v1/categories${bbyQuery}`;

    return {url, params};
  }
}
