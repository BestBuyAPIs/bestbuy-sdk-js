var test = require('tape');

var BBY = require('../');
var pkg = require('../package.json');

var bby = BBY({ key: 'XXX' });

test('User-Agent matches package version', function (t) {
  t.equals(bby.options.headers['User-Agent'], 'bestbuy-sdk-js/' + pkg.version + ';nodejs');
  t.end();
});
