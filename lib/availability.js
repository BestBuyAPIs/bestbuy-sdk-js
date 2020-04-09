module.exports = availabilityEndpoint;

function availabilityEndpoint (opts) {
  return { availability, availabilityAsStream };

  function availability (sku, storeIdsArray, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = {};
    }

    if (typeof callback !== 'function' && typeof callback !== 'undefined') {
      var argsErr = new Error('Unrecognized parameter length when calling "availability" method');
      return Promise.reject(argsErr);
    }

    var req;
    try {
      req = prepareRequest(sku, storeIdsArray, params);
    } catch (err) {
      if (callback) {
        callback(err);
      }
      return Promise.reject(err);
    }

    return opts.apiService(req, callback);
  }

  function availabilityAsStream (sku, storIdsArray, params) {
    // availability calls can only have pageSize 10 max
    if (!params) params = {};
    params.pageSize = 10;

    return opts.apiStreamService('products.*', prepareRequest(sku, storIdsArray, params));
  }

  function prepareRequest (sku, storeIdsArray, params) {
    // ensure sku is good
    if (typeof sku !== 'number' && typeof sku !== 'string') {
      throw new Error('First parameter of "availability" must be the SKU, and it must be either a number or a string');
    }

    // ensure storeIdsArray is good
    if (!Array.isArray(storeIdsArray)) {
      throw new Error('Second parameter of "availability" must be store id(s), and it must be either a number or array of numbers');
    }

    var storeIds = storeIdsArray.join(',');
    var bbyQuery = `(sku=${sku})+stores(storeId in(${storeIds}))`;

    var url = `${opts.url}/v1/products${bbyQuery}`;

    return { url, params };
  }
}
