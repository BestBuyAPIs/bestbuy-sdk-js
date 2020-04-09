module.exports = productsEndpoint;

function productsEndpoint (opts) {
  return { products, productsAsStream };

  function products (search, params, callback) {
    if (typeof params === 'function' && !callback) {
      callback = params;
      params = {};
    }

    if (typeof params === 'function') {
      var queryObjFuncErr = new Error('Unhandled parameter type');
      callback(queryObjFuncErr);
      return Promise.reject(queryObjFuncErr);
    }

    return opts.apiService(prepareRequest(search, params), callback);
  }

  function productsAsStream (search, params) {
    return opts.apiStreamService('products.*', prepareRequest(search, params));
  }

  function prepareRequest (search, params) {
    var bbyQuery = (search && search.length > 0) ? `(${search})` : '';

    if (!isNaN(search) && typeof search === 'number') {
      // Resource ID
      var ext = (params && params.format === 'xml') ? 'xml' : 'json';
      bbyQuery = `/${search}.${ext}`;
    }
    var url = `${opts.url}/v1/products${bbyQuery}`;

    return { url, params };
  }
}
