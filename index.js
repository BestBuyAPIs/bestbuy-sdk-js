var pkg = require('./package.json');

module.exports = bestbuy;

function bestbuy (_options) {
  var options = setupOptions(_options);

  if (!options.key) throw new Error('A Best Buy developer API key is required');

  return {
    options: options,
    availability: require('./lib/availability')(options),
    openBox: require('./lib/openBox')(options),
    categories: require('./lib/categories')(options),
    products: require('./lib/products')(options),
    productsAsStream: require('./lib/products-as-stream')(options),
    recommendations: require('./lib/recommendations')(options),
    stores: require('./lib/stores')(options),
    warranties: require('./lib/warranties')(options),
    version: require('./lib/version')(options)
  };
}

function setupOptions (_opts) {
  var opts = {
    key: process.env.BBY_API_KEY,
    url: 'https://api.bestbuy.com',
    debug: false,
    headers: {
      'User-Agent': `bestbuy-sdk-js/${pkg.version};nodejs`
    },
    requestsPerSecond: 5
  };

  if (typeof _opts === 'string') {
    opts.key = _opts;
  } else if (typeof _opts === 'object') {
    opts = Object.assign(opts, _opts);
  }

  opts.apiService = require('./lib/api.service')(opts);

  return opts;
}
