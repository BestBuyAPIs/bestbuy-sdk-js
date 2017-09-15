module.exports = warrantiesEndpoint;

function warrantiesEndpoint (opts) {
  return function warranties (sku, callback) {
    if (typeof callback === 'undefined') callback = function noop () {};

    var url = `${opts.url}/v1/products/${sku}/warranties.json`;

    return opts.apiService({url}, callback);
  };
}
