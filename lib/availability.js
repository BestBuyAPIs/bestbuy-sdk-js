module.exports = availabilityEndpoint;

function availabilityEndpoint (opts) {
  return function availability (sku, storeIdsArray, queryObj, callback) {
    if (typeof queryObj === 'function') {
      callback = queryObj;
      queryObj = {};
    }
    if (typeof callback === 'undefined') callback = function noop () {};
    if (typeof callback !== 'function') {
      var argsErr = new Error('Unrecognized parameter length when calling "availability" method');
      return Promise.reject(argsErr);
    }

    // ensure sku is good
    if (typeof sku !== 'number' && typeof sku !== 'string') {
      var skuErr = new Error('First parameter of "availability" must be the SKU, and it must be either a number or a string');
      callback(skuErr);
      return Promise.reject(skuErr);
    }

    // ensure storeIdsArray is good
    if (!Array.isArray(storeIdsArray)) {
      var storeErr = new Error('Second parameter of "availability" must be store id(s), and it must be either a number or array of numbers');
      callback(storeErr);
      return Promise.reject(storeErr);
    }

    var storeIds = storeIdsArray.join(',');
    var bbyQuery = `(sku=${sku})+stores(storeId in(${storeIds}))`;

    var url = `${opts.url}/v1/products${bbyQuery}`;

    return opts.apiService(url, {}, callback);
  };
}
