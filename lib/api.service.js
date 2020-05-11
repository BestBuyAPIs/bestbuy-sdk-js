module.exports = apiServiceFactory;

const rateLimiter = require('./rate-limiter');
const debugLogger = require('./debug-logger');

const axios = require('axios');

function apiServiceFactory (opts) {
  var debugInstance;
  var instance;

  var baseRequest = {
    method: 'get',
    headers: opts.headers,
    timeout: opts.timeout
  };
  var baseRequestParams = { format: 'json', apiKey: opts.key };

  function apiService (requestOpts, callback, attempts) {
    if (!attempts) attempts = 0;
    var request = Object.assign({}, baseRequest, requestOpts);
    request.params = Object.assign({}, baseRequestParams, requestOpts.params);

    return runAxios(opts, request)
      .then(result => {
        if (callback) callback(null, result.data);
        return result.data;
      })
      .catch(error => {
        attempts++;
        if (attempts > opts.maxRetries) {
          return finishWithError(error, request.params.format, callback);
        }

        if (error.response && error.response.status > 400 && error.response.status !== 404) {
          return waitABit(opts.retryInterval).then(() => apiService(requestOpts, callback, attempts));
        }

        if (error.code) {
          return waitABit(opts.retryInterval).then(() => apiService(requestOpts, callback, attempts));
        }

        return finishWithError(error, request.params.format, callback);
      });
  }

  function finishWithError (error, requestFormat, callback) {
    const wrappingError = new Error('Exceeded max retries');
    wrappingError.cause = error;
    const response = error.response;
    if (response) {
      wrappingError.headers = response.headers;
      wrappingError.status = response.status;
      if (response.data.constructor.name === 'IncomingMessage') {
        return getBodyFromStream(response.data)
          .then(body => {
            wrappingError.body = requestFormat === 'json' ? JSON.parse(body) : body;
            return wrappingError;
          })
          .catch(error => {
            wrappingError.errorHandlingError = error;
            return wrappingError;
          })
          .then(wrappingError => {
            if (callback) callback(wrappingError);
            throw wrappingError;
          });
      } else {
        wrappingError.body = response.data;
      }
    }
    if (callback) {
      callback(wrappingError);
    } else {
      return Promise.reject(wrappingError);
    }
  }

  function getBodyFromStream (s) {
    return new Promise((resolve, reject) => {
      let body = '';
      s.on('readable', () => {
        const read = s.read();
        if (read) body += read;
      });
      s.on('error', error => {
        reject(error);
      });
      s.on('end', () => {
        resolve(body);
      });
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
        debugInstance = axios.create();
        rateLimiter.rateLimiter(debugInstance, opts.requestsPerSecond);
        debugLogger(debugInstance, opts.debug);
      }
      return debugInstance(data);
    } else {
      if (!instance) {
        instance = axios.create();
        rateLimiter.rateLimiter(instance, opts.requestsPerSecond);
      }
      return instance(data);
    }
  }

  return apiService;
}
