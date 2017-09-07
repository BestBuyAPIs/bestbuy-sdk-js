module.exports = apiService;

const axios = require('axios');

function apiService (opts, url, params, callback) {
  var data = {
    method: 'get',
    url: url,
    params: Object.assign({}, opts.baseParams, params),
    headers: opts.headers
  };

  var runAxios = opts.debug ? axiosWithDebug(opts.debug, data) : axios(data);

  return runAxios.then(result => {
    callback(null, result.data);
    return result.data;
  })
  .catch(error => {
    callback(error.response);
    return Promise.reject(error.response);
  });
}

function axiosWithDebug (debug, data) {
  var axiosDebug = axios.create();
  addLogger(axiosDebug, debug);
  return axiosDebug(data);
}

function addLogger (instance, debug) {
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
