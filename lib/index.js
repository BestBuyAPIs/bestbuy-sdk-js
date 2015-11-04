var resource = require('./resource');

var BBY = {
	init: function(options){
		this.options = options || {
			    					key: process.env.BBY_API_KEY,
			    					url:'https://api.bestbuy.com/v1',
			    					debug:false,
			    					headers:{'User-Agent':'bestbuy-sdk-js'}
								};
		this.availability= resource('availability', this.options);
		this.buyingOptions = resource('buyingOptions', { key: this.options.key, debug: this.options.debug, url: 'http://api.bestbuy.com/beta', headers:this.options.headers});
		this.categories= resource('categories', this.options);
		this.products = resource('products', this.options);		
		this.recommendations = resource('recommendations', { key: this.options.key, debug: this.options.debug, url: 'http://api.bestbuy.com/beta', headers:this.options.headers});			
		this.reviews= resource('reviews', this.options);
		this.smartLists= resource('smartLists', { key: this.options.key, debug: this.options.debug, url: 'http://api.bestbuy.com/beta', headers:this.options.headers});
		this.stores =resource('stores', this.options);		
},

	// Expose top-level resources from the BBY API
	availability : function() { return  this.availability; },
	buyingOptions : function() { return  this.buyingOptions; },
	categories : function() { return  this.categories; },
	products : function() { return this.products; },
	recommendations : function() { return  this.recommendations; },
	reviews: function() { return this.reviews; },
	smartLists : function() { return this.smartLists; },
	stores : function() { return this.stores; }
};

// Module config + REST resources is the public module interface
module.exports = BBY;