import alt from '../alt';
import bby from '../../bestbuy';


class ProductsActions {
	constructor() {
		this.generateActions(
			'getProductsSuccess',
			'getProductsError'
			);
	}

	getProducts(search){
		var api = bby.init(process.env.BBY_API_KEY);
		console.log(process.env.BBY_API_KEY);
		bby.products(search, {
		    show: 'name,sku,salePrice'
		}, (err, data)=> {
			console.log(JSON.stringify(data));
		    this.actions.getProductsSuccess(data); 
		});
	}
}

export default alt.createActions(ProductsActions);