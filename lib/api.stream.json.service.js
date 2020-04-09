module.exports = apiStreamJsonServiceFactory;

var JSONStream = require('JSONStream');
var through = require('through2');
var pump = require('pump');

function apiStreamJsonServiceFactory (opts) {
  function apiStreamJsonService (jsonFilterKey, req) {
    var outputStream = through.obj();

    if (req.url.endsWith('.json')) {
      streamSingleItem(req, outputStream);
    } else {
      streamAllData(jsonFilterKey, req, outputStream);
    }
    return outputStream;
  }

  function streamSingleItem (req, stream) {
    opts.apiService(req).then(result => {
      stream.emit('total', 1);
      stream.write(result);
      stream.end();
    });
  }

  function streamAllData (jsonFilterKey, req, stream) {
    if (!req.responseType) req.responseType = 'stream';
    if (!req.params) req.params = {};

    if (!req.params.cursorMark) req.params.cursorMark = '*';
    if (!req.params.pageSize) req.params.pageSize = 100;

    req.params.format = 'json'; // only json is supported for streaming

    return opts.apiService(req).then(result => {
      var header;
      var jsonStream = JSONStream.parse(jsonFilterKey);

      jsonStream.on('data', data => stream.write(data));
      jsonStream.on('header', h => {
        header = h;
        if (header.metadata && req.params.page === 1) {
          stream.emit('total', header.metadata.resultSet.count);
        } else if (req.params.cursorMark === '*' && !header.metadata) {
          // emit total on first response
          stream.emit('total', header.total);
        }
      });

      // pipe result -> jsonStream
      pump(result, jsonStream, err => {
        if (err) console.error(err);
        if (header.nextCursorMark && header.nextCursorMark === req.params.cursorMark) {
          stream.end();
        } else if (header.metadata) {
          // openBox paginate
          if (header.metadata.page.current === header.metadata.page.total) {
            stream.end();
          } else {
            req.params = Object.assign({}, req.params, { page: header.metadata.page.current + 1 });
            streamAllData(jsonFilterKey, req, stream).catch(err => { throw err; });
          }
        } else if (!header.nextCursorMark) {
          // endpoint does not have cursorMark support
          stream.end();
        } else {
          req.params = Object.assign({}, req.params, { cursorMark: header.nextCursorMark });
          streamAllData(jsonFilterKey, req, stream).catch(err => { throw err; });
        }
      });
    })
      .catch(error => {
        stream.emit('error', error);
        stream.end();
      });
  }

  return apiStreamJsonService;
}
