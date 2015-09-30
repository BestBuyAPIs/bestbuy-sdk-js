import alt from '../alt';
import CategoriesActions from '../actions/CategoriesActions';

class CategoriesStore {
	constructor() {
		this.bindActions(CategoriesActions);
		this.categories = [];
	}

	onGetCategoriesSuccess(data){
		this.categories = data.categories.slice(0, data.length);
	}
}

export default alt.createStore(CategoriesStore);