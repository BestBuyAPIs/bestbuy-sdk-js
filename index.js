var pkg = require('./package.json');

module.exports = bestbuy;

function bestbuy (_options) {
  var options = setupOptions(_options);

  const availabilityEndpoint = require('./lib/availability')(options);
  const realTimeAvailabilityEndpoint = require('./lib/real-time-availability')(options);
  const categoriesEndpoint = require('./lib/categories')(options);
  const productsEndpoint = require('./lib/products')(options);
  const openBoxEndpoint = require('./lib/openBox')(options);
  const storesEndpoint = require('./lib/stores')(options);

  if (!options.key) throw new Error('A Best Buy developer API key is required');

  return {
    options: options,
    availability: availabilityEndpoint.availability,
    availabilityAsStream: availabilityEndpoint.availabilityAsStream,
    realTimeAvailability: realTimeAvailabilityEndpoint.realTimeAvailability,
    openBox: openBoxEndpoint.openBox,
    openBoxAsStream: openBoxEndpoint.openBoxAsStream,
    categories: categoriesEndpoint.categories,
    categoriesAsStream: categoriesEndpoint.categoriesAsStream,
    products: productsEndpoint.products,
    productsAsStream: productsEndpoint.productsAsStream,
    recommendations: require('./lib/recommendations')(options),
    stores: storesEndpoint.stores,
    storesAsStream: storesEndpoint.storesAsStream,
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
    requestsPerSecond: 5,
    maxRetries: 0,
    retryInterval: 2000,
    timeout: 5000
  };

  if (typeof _opts === 'string') {
    opts.key = _opts;
  } else if (typeof _opts === 'object') {
    opts = Object.assign(opts, _opts);
  }

  opts.apiService = require('./lib/api.service')(opts);
  opts.apiStreamService = require('./lib/api.stream.service')(opts);

  return opts;
}
