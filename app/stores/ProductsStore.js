import alt from '../alt';
import ProductActions from '../actions/ProductsActions';

class ProductsStore {
	constructor() {
		this.bindActions(ProductActions);
		this.products = [];
	}

	onGetProductsSuccess(data){
		this.products = data.products.slice(0, data.length);
	}
}

export default alt.createStore(ProductsStore);