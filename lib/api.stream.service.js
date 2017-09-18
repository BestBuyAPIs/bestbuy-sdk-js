module.exports = apiStreamServiceFactory;

var apiStreamJsonService = require('./api.stream.json.service');
var apiStreamXmlService = require('./api.stream.xml.service');

function apiStreamServiceFactory (opts) {
  function apiStreamService (jsonFilterKey, req) {
    if (req.params && req.params.format === 'xml') {
      return apiStreamXmlService(opts)(jsonFilterKey, req);
    } else {
      return apiStreamJsonService(opts)(jsonFilterKey, req);
    }
  }

  return apiStreamService;
}
