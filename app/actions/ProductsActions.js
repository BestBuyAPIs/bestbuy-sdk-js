import alt from '../alt';
import WebApiUtils from '../utils/WebApiUtils';

class ProductsActions {
	constructor() {
		this.generateActions(
			'getProductsSuccess',
			'getProductsError'
			);
	}

	getProducts(search, qs){
		WebApiUtils.getProducts(search, qs, this.actions.getProductsSuccess);
	}
}

export default alt.createActions(ProductsActions);