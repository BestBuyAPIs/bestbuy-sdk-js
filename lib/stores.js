module.exports = storesEndpoint;

function storesEndpoint (opts) {
  return { stores, storesAsStream };

  function stores (search, params, callback) {
    if (typeof params === 'function' && !callback) {
      callback = params;
      params = {};
    }

    return opts.apiService(prepareRequest(search, params), callback);
  }

  function storesAsStream (search, params) {
    return opts.apiStreamService('stores.*', prepareRequest(search, params));
  }

  function prepareRequest (search, params) {
    var bbyQuery = (search && search.length > 0) ? `(${search})` : '';

    if (!isNaN(search) && typeof search === 'number') {
      // Resource ID
      var ext = (params && params.format === 'xml') ? 'xml' : 'json';
      bbyQuery = `/${search}.${ext}`;
    }
    var url = `${opts.url}/v1/stores${bbyQuery}`;

    return { url, params };
  }
}
