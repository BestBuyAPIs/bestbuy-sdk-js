'use strict';

var assign = require('lodash.assign');
var Resource = require('./Resource');
var Default = require('./DefaultStrategy');
var Recommendations = require('./RecommendationsStrategy');
var Availability = require('./AvailabilityStrategy');
var OpenBox = require('./OpenBoxStrategy');
var Warranties = require('./WarrantiesStrategy');
var pkg = require('../package.json');

var BBY = {
  init: function (options) {
    this.options = {
      key: process.env.BBY_API_KEY,
      url: 'https://api.bestbuy.com/v1',
      debug: false,
      headers: {
        'User-Agent': 'bestbuy-sdk-js/' + pkg.version + ';nodejs'
      }
    };
        // As an effort to support the v0.0.1 functionality, if initialized with just
        // a string, we assume that string is the key
    if (typeof options === 'string') {
      this.options.key = options;
    } else if (typeof options === 'object') {
      this.options = assign(this.options, options);
    }
    this.availability = Resource(Availability(), this.options);
    this.openBox = Resource(OpenBox(), {
      key: this.options.key,
      debug: this.options.debug,
      url: 'https://api.bestbuy.com/beta',
      headers: this.options.headers
    });
    this.categories = Resource(Default('categories'), this.options);
    this.products = Resource(Default('products'), this.options);
    this.recommendations = Resource(Recommendations(), {
      key: this.options.key,
      debug: this.options.debug,
      url: 'https://api.bestbuy.com/beta',
      headers: this.options.headers
    });
    this.reviews = Resource(Default('reviews'), this.options);
    this.stores = Resource(Default('stores'), this.options);
    this.warranties = Resource(Warranties(), this.options);
    return this;
  }
};

function newInstance (options) {
  var bby = Object.create(BBY);
  return bby.init(options);
}

// Module config + REST resources is the public module interface
module.exports = newInstance;
