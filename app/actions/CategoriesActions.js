import alt from '../alt';
import WebApiUtils from '../utils/WebApiUtils';

class CategoriesActions {
	constructor() {				
		this.generateActions(
			'getCategoriesSuccess',
			'getCategoriesError'
			);
	}

	getCategories(search){
		WebApiUtils.getCategories(search, {}, this.actions.getCategoriesSuccess);
	}
}

export default alt.createActions(CategoriesActions);