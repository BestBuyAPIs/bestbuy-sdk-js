module.exports = storesEndpoint;

function storesEndpoint (opts) {
  return function stores (search, callback) {
    if (typeof callback === 'undefined') callback = function noop () {};

    var bbyQuery = `(${search})`;

    if (!isNaN(search) && typeof search === 'number') {
      // Resource ID
      bbyQuery = `/${search}.json`;
    }

    var url = `${opts.url}/v1/stores${bbyQuery}`;

    return opts.apiService(url, {}, callback);
  };
}
