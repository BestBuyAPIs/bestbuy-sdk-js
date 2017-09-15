module.exports = versionEndpoint;

var pkg = require('../package.json');

function versionEndpoint (opts) {
  return function version (callback) {
    if (typeof callback === 'undefined') callback = function noop () {};

    var url = `${opts.url}/version.txt`;

    return opts.apiService({url}, jsonify(callback))
    .then(version => {
      return createVersionObject(version);
    });
  };
}

function jsonify (cb) {
  return function (err, version) {
    if (err) return cb(err);
    return cb(null, createVersionObject(version));
  };
}

function createVersionObject (apiVersion) {
  return {
    packageVersion: pkg.version,
    apiVersion: apiVersion.trim()
  };
}
