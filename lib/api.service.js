module.exports = apiServiceFactory;

const rateLimiter = require('./rate-limiter');
const debugLogger = require('./debug-logger');

const axios = require('axios');

function apiServiceFactory (opts) {
  var debugInstance;
  var instance;

  var baseRequest = {method: 'get', headers: opts.headers};
  var baseRequestParams = {format: 'json', apiKey: opts.key};

  function apiService (requestOpts, callback) {
    var request = Object.assign({}, baseRequest, requestOpts);
    request.params = Object.assign({}, baseRequestParams, requestOpts.params);

    return runAxios(opts, request)
      .then(result => {
        if (callback) callback(null, result.data);
        return result.data;
      })
      .catch(error => {
        if (error.response && error.response.status > 400 && error.response.status !== 404) {
          return waitABit(2000).then(() => apiService(requestOpts, callback));
        }

        if (error.code) {
          return waitABit(2000).then(() => apiService(requestOpts, callback));
        }

        if (callback) callback(error.response);
        return Promise.reject(error.response);
      });
  }

  function waitABit (ms) {
    return new Promise(resolve => {
      setTimeout(() => resolve(true), ms);
    });
  }

  function runAxios (opts, data) {
    if (opts.debug) {
      if (!debugInstance) {
        debugInstance = axios.create({timeout: 5000});
        rateLimiter(debugInstance, opts.requestsPerSecond);
        debugLogger(debugInstance, opts.debug);
      }
      return debugInstance(data);
    } else {
      if (!instance) {
        instance = axios.create({timeout: 5000});
        rateLimiter(instance, opts.requestsPerSecond);
      }
      return instance(data);
    }
  }

  return apiService;
}
