module.exports = versionEndpoint;

var pkg = require('../package.json');

function versionEndpoint (opts) {
  return function version (callback) {
    var url = `${opts.url}/version.txt`;
    const jsonifiedCallback = callback ? jsonify(callback) : undefined;

    return opts.apiService({ url }, jsonifiedCallback)
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
