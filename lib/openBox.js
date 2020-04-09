module.exports = openBoxEndpoint;

function openBoxEndpoint (opts) {
  return { openBox, openBoxAsStream };

  function openBox (search, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = {};
    }

    return opts.apiService(prepareRequest(search, params), callback);
  }

  function openBoxAsStream (search, params) {
    // cursorMarks are not supported so we'll use pages
    if (!params) params = {};
    params.page = 1;
    return opts.apiStreamService('results.*', prepareRequest(search, params));
  }

  function prepareRequest (search, params) {
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
    } else {
      url = `${opts.url}/beta/products/openBox`;
    }

    return { url, params };
  }
}
