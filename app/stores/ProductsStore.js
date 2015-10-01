import alt from '../alt';
import ProductActions from '../actions/ProductsActions';

class ProductsStore {
	constructor() {
		this.bindActions(ProductActions);
		this.products = [];
		this.pages = {};
	}

	onGetProductsSuccess(data){		
			var url = data.canonicalUrl;
			
			this.products = data.products.slice(0, data.length);

			var result = /\(.+\)/.exec(url);
			if (result && result.length>0)
		  		this.products.search = result[0];
		  					
			this.pages = {	items : { from: data.from, to: data.to, total: data.total	},	current:data.currentPage, total:data.totalPages 	};
	}
}

export default alt.createStore(ProductsStore);