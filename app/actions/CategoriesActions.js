import alt from '../alt';
var bby = require('../../bestbuy');


class CategoriesActions {
	constructor() {
		try{
			bby.key = BBY_API_KEY;
		}
		catch(err){
			console.log(err);
		}
		this.generateActions(
			'getCategoriesSuccess',
			'getCategoriesError'
			);
	}

	getCategories(search){
		bby.categories(search, {
		    show: 'name,id'
		}, (err, data)=> {
			console.log(JSON.stringify(data));
		    this.actions.getCategoriesSuccess(data); 
		});
	}
}

export default alt.createActions(CategoriesActions);