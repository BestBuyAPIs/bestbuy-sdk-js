module.exports = debugLogger;

function debugLogger (instance, debug) {
  var debugFn;
  if (typeof debug === 'function') {
    debugFn = debug;
  } else {
    debugFn = (data) => { console.log(JSON.stringify(data, null, 2)); };
  }

  instance.interceptors.request.use(function (request) {
    debugFn({
      request: {
        method: request.method,
        url: request.url,
        headers: request.headers
      }
    });
    return request;
  });
  instance.interceptors.response.use(function (response) {
    debugFn({
      response: {
        headers: response.headers,
        status: response.status,
        url: response.url,
        body: response.data
      }
    });
    return response;
  }, function (error) {
    throw error;
  });
}
