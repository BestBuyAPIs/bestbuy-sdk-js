module.exports = storesEndpoint;

function storesEndpoint (opts) {
  return {stores, storesAsStream};

  function stores (search, callback) {
    if (typeof callback === 'undefined') callback = function noop () {};

    return opts.apiService(prepareRequest(search), callback);
  }

  function storesAsStream (search) {
    return opts.apiStreamService('stores.*', prepareRequest(search));
  }

  function prepareRequest (search) {
    var bbyQuery = `(${search})`;

    if (!isNaN(search) && typeof search === 'number') {
          // Resource ID
      bbyQuery = `/${search}.json`;
    }

    var url = `${opts.url}/v1/stores${bbyQuery}`;

    return {url};
  }
}
