module.exports = apiService;

const axios = require('axios');

const axiosDebug = axios.create();
addLogger(axiosDebug);

function apiService (opts, url, params, callback) {
  var data = {
    method: 'get',
    url: url,
    params: Object.assign({}, opts.baseParams, params),
    headers: opts.headers
  };

  var runAxios = opts.debug ? axiosDebug(data) : axios(data);

  return runAxios.then(result => {
    callback(null, result.data);
    return result.data;
  })
  .catch(error => {
    callback(error.response);
    return Promise.reject(error.response);
  });
}

function addLogger (instance) {
  instance.interceptors.request.use(function (request) {
    console.log(JSON.stringify({
      request: {
        method: request.method,
        url: request.url,
        headers: request.headers
      }}, null, 2));
    return request;
  });
  instance.interceptors.response.use(function (response) {
    console.log(JSON.stringify({
      response: {
        headers: response.headers,
        status: response.status,
        url: response.url,
        body: response.data
      }}, null, 2));
    return response;
  }, function (error) {
    throw error;
  });
}
