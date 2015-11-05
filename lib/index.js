var Resource = require('./Resource');
var Default = require('./DefaultStrategy');
var Recommendations = require('./RecommendationsStrategy');
var Availability = require('./AvailabilityStrategy');
var BuyingOptions = require('./BuyingOptionsStrategy');
var SmartLists = require('./SmartListsStrategy');

var BBY = {
    init: function(options) {

        this.options = options || {
            key: process.env.BBY_API_KEY,
            debug: false,
            headers: {
                'User-Agent': 'bestbuy-sdk-js'
            }
        };
        this.options.url = 'https://api.bestbuy.com/v1';

        this.availability = Resource(Availability(), this.options);
        this.buyingOptions = Resource(BuyingOptions(), {
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
        this.smartLists = Resource(SmartLists(), {
            key: this.options.key,
            debug: this.options.debug,
            url: 'https://api.bestbuy.com/beta',
            headers: this.options.headers
        });
        this.stores = Resource(Default('stores'), this.options);
    },

    // Expose top-level resources from the BBY API
    availability: function() {
        return this.availability;
    },
    buyingOptions: function() {
        return this.buyingOptions;
    },
    categories: function() {
        return this.categories;
    },
    products: function() {
        return this.products;
    },
    recommendations: function() {
        return this.recommendations;
    },
    reviews: function() {
        return this.reviews;
    },
    smartLists: function() {
        return this.smartLists;
    },
    stores: function() {
        return this.stores;
    }
};

// Module config + REST resources is the public module interface
module.exports = BBY;