import alt from '../alt';
import bby from '../../bestbuy';


class CategoriesActions {
	constructor() {
		this.generateActions(
			'getCategoriesSuccess',
			'getCategoriesError'
			);
	}

	getCategories(search){
		var api = bby.init(process.env.BBY_API_KEY);
		console.log(process.env.BBY_API_KEY);
		bby.categories(search, {
		    show: 'name,id'
		}, (err, data)=> {
			console.log(JSON.stringify(data));
		    this.actions.getCategoriesSuccess(data); 
		});
	}
}

export default alt.createActions(CategoriesActions);