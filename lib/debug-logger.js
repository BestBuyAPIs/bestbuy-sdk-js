module.exports = debugLogger;

var peek = require('peek-stream');
var through = require('through2');
var pump = require('pump');

function debugLogger (instance, debug) {
  var debugFn;
  if (typeof debug === 'function') {
    debugFn = debug;
  } else {
    debugFn = (data) => {
      if (data.error) {
        console.error(data.error);
      } else {
        var formattedData;
        try {
          formattedData = JSON.stringify(data, null, 2);
        } catch (err) {
          console.error('Error while trying to JSON format the data!', err.message, err.stack);
          formattedData = data;
        }
        console.log(formattedData);
      }
    };
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
    if (response.data.readable) {
      var stream = body;

      var peekStream = peek(function (data, swap) {
        debugFn({
          response: {
            headers: response.headers,
            status: response.status,
            url: response.url,
            isStream: true,
            body: data.toString()
          }
        });
        swap(null, through());
      });

      pump(stream, peekStream);
      response.data = peekStream;
    } else {
      debugFn({
        response: {
          headers: response.headers,
          status: response.status,
          url: response.url,
          body: body
        }
      });
    }

    return response;
  }, function (error) {
    debugFn({ error });
    throw error;
  });
}
