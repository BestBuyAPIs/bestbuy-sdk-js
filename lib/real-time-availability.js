module.exports = realTimeAvailabilityEndpoint;

function realTimeAvailabilityEndpoint (opts) {
  return { realTimeAvailability };

  function realTimeAvailability (sku, params, callback) {
    if (!(params.storeId || params.postalCode)) {
      var argsErr = new Error('Must provide either storeId or postalCode');
      if (callback) {
        callback(argsErr);
      }
      return Promise.reject(argsErr);
    }

    var req;
    try {
      req = prepareRequest(sku, params);
    } catch (err) {
      if (callback) {
        callback(err);
      }
      return Promise.reject(err);
    }

    return opts.apiService(req, callback);
  }

  function prepareRequest (sku, params) {
    // ensure sku is good
    if (typeof sku !== 'number' && typeof sku !== 'string') {
      throw new Error('First parameter of "realTimeAvailability" must be the SKU, and it must be either a number or a string');
    }

    var url = `${opts.url}/v1/products/${sku}/stores.json`;

    return { url, params };
  }
}
