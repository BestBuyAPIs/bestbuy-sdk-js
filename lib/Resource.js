'use strict';

var request = require('request-promise');
var assign = require('lodash.assign');
var Promise = require('bluebird');

var Resource = function (_strategy, _config) {
  var config = _config;
  var strategy = _strategy;

  return function () {
    var requestOptions;
    var callback;
    var handleErr = function (err) {
      if (callback) {
        callback(err);
        return;
      } else {
        return Promise.reject(err);
      }
    };

        // find callback
    var args = Array.prototype.slice.call(arguments);
    if (args !== null && typeof args[args.length - 1] === 'function') {
      callback = args.pop();
    }

    try {
      requestOptions = strategy.apply(null, args);
    } catch (err) {
      return handleErr(err);
    }

    if (requestOptions instanceof Error) {
      return handleErr(requestOptions.message);
    }

        // Throw if BBY API key has not been specified
    if (!config.key) {
      throw new Error('A Best Buy developer API key is required. Register for one at ' +
                'developer.bestbuy.com, call bestbuy(YOUR_API_KEY), or ' +
                'specify a BBY_API_KEY system environment variable.');
    }

    if (config.debug) {
      require('request-debug')(request);
    }

    // set up query string defaults
    var qs = assign({
      apiKey: config.key,
      format: 'json'
    }, requestOptions.qs);

        // Assemble request URL
    var url = config.url + requestOptions.path;
    if (requestOptions.query) {
      url = url + '(' + requestOptions.query + ')';
    }
    if (requestOptions.id) {
      url = url + '/' + requestOptions.id + '.json';
            // sending a format for a specific resource results in a 400 :/
      delete qs.format;
    }

    var headers = {};
    if (config.headers instanceof Object) {
      headers = config.headers;
    }

    var options = {
      uri: url,
      qs: qs,
      headers: headers,
      json: true
    };

    return request(options)
      .then(function (body) {
        if (callback) {
          callback(null, body);
        } else {
          return body;
        }
      })
      .catch(function (err) {
        if (callback) {
          callback(err);
        } else { throw err; }
      });
  };
};

module.exports = Resource;
