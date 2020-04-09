module.exports = apiStreamXmlServiceFactory;
var xmlNodes = require('@flet/xml-nodes');
var through = require('through2');
var pump = require('pump');

var filterKeys = {
  'products.*': 'product',
  'categories.*': 'category',
  'stores.*': 'store'
};

function apiStreamXmlServiceFactory (opts) {
  function apiStreamXmlService (jsonFilterKey, req) {
    var outputStream = through();

    if (req.url.endsWith('.xml')) {
      streamSingleItem(filterKeys[jsonFilterKey], req, outputStream);
    } else {
      streamAllData(filterKeys[jsonFilterKey], req, outputStream);
    }
    return outputStream;
  }

  function streamSingleItem (xmlFilterKey, req, stream) {
    req.responseType = 'stream';

    opts.apiService(req).then(result => {
      stream.emit('total', 1);

      var xmlStream = xmlNodes(xmlFilterKey);
      xmlStream.on('data', data => stream.write(data));

      pump(result, xmlStream, err => {
        if (err) console.error(err);
        stream.end();
      });
    });
  }

  function streamAllData (xmlFilterKey, req, stream) {
    if (!req.responseType) req.responseType = 'stream';

    if (!req.params.cursorMark) req.params.cursorMark = '*';
    if (!req.params.pageSize) req.params.pageSize = 100;

    return opts.apiService(req).then(result => {
      var header = {};

      var attributes = attrFinder(['nextCursorMark', 'total']);

      var xmlStream = xmlNodes(xmlFilterKey);

      xmlStream.on('data', data => stream.write(data));

      attributes.on('nextCursorMark', nextCursorMark => {
        header.nextCursorMark = nextCursorMark;
      });

      attributes.on('total', total => {
        header.total = Number(total);
        if (req.params.cursorMark === '*') {
        // emit total on first response
          stream.emit('total', header.total);
        }
      });

      // pipe result -> xmlStream
      pump(result, attributes, xmlStream, err => {
        if (err) console.error(err);
        if (header.nextCursorMark && header.nextCursorMark === req.params.cursorMark) {
          stream.end();
        } else if (!header || !header.nextCursorMark) {
          // endpoint does not have cursorMark support
          stream.end();
        } else {
          req.params = Object.assign({}, req.params, { cursorMark: header.nextCursorMark });
          streamAllData(xmlFilterKey, req, stream).catch(err => { throw err; });
        }
      });
    })
      .catch(error => {
        stream.emit('error', error);
        stream.end();
      });
  }

  return apiStreamXmlService;
}

function attrFinder (attrs) {
  var soFar = '';
  var allAttrs = {};
  var allAttrsRegex = {};
  var attrsFound = 0;

  attrs.forEach(a => {
    allAttrsRegex[a] = new RegExp(a + '="([^"]+)"');
  });

  return through(function (chunk, enc, done) {
    if (attrsFound !== attrs.length) {
      soFar += String(chunk);
      attrs.forEach(attr => {
        if (allAttrs[attr]) return;

        var val = soFar.match(allAttrsRegex[attr]);
        if (val) {
          allAttrs[attr] = val[1];
          this.emit(attr, allAttrs[attr]);
          attrsFound++;
        }
      });
      if (attrsFound === attrs.length) {
        soFar = null;
      }
    }

    this.push(chunk);

    done();
  });
}
