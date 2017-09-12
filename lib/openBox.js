module.exports = openBoxEndpoint;

function openBoxEndpoint (opts) {
  return function openBox (search, queryObj, callback) {
    if (typeof queryObj === 'function') {
      callback = queryObj;
      queryObj = {};
    }
    if (typeof callback === 'undefined') callback = function noop () {};

    var url;

    if (typeof search === 'number') {
      url = `${opts.url}/beta/products/${search}/openBox`;
    } else if (typeof search === 'string' && search.length > 0) {
     // Search is still a "sku", but was passed as a string
      if (!isNaN(parseInt(search))) {
        url = `${opts.url}/beta/products/${search}/openBox`;
      } else {
        url = `${opts.url}/beta/products/openBox(${search})`;
      }
    }

    return opts.apiService(url, queryObj, callback);
  };
}
