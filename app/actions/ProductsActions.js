import alt from '../alt';
var bby = require('../../bestbuy');


class ProductsActions {
	constructor() {
		try{
		bby.key = BBY_API_KEY;
	}
	catch(err){
		console.log(err);
	}
		this.generateActions(
			'getProductsSuccess',
			'getProductsError'
			);
	}

	getProducts(search){
		bby.products(search, {
		    show: 'name,sku,salePrice'
		}, (err, data)=> {
			console.log(JSON.stringify(data));
		    this.actions.getProductsSuccess(data); 
		});
	}
}

export default alt.createActions(ProductsActions);