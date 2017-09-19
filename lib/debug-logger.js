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
        headers: request.headers,
        params: request.params,
        responseType: request.responseType
      }
    });
    return request;
  });
  instance.interceptors.response.use(function (response) {
    var body = response.data;
    if (response.data.readable) body = 'stream';
    debugFn({
      response: {
        headers: response.headers,
        status: response.status,
        url: response.url,
        body: body
      }
    });
    return response;
  }, function (error) {
    throw error;
  });
}
