import bby from '../../bestbuy';

class WebApiUtils {
	constructor(){
		try {
			bby.key = BBY_API_KEY;
		}
		catch(err){
			//will catch on server since this is set in the template
		}
	}

	getProducts(search, qs, fn){
		if (!qs)
			qs ={};
		bby.products(search, qs, (err, data)=> {
		    fn(data); 
		});
	}

	getCategories(search, qs, fn){
		if (!qs)
			qs ={};
		bby.categories(search, qs, (err, data)=> {
		    fn(data); 
		});
	}
}

export default new WebApiUtils();