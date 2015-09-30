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

	getProducts(search, fn){
		bby.products(search, {
		    show: 'name,sku,salePrice'
		}, (err, data)=> {
			console.log(JSON.stringify(data));
		    fn(data); 
		});
	}

	getCategories(search, fn){
		bby.categories(search, {
		    show: 'name,id'
		}, (err, data)=> {
			console.log(JSON.stringify(data));
		    fn(data); 
		});
	}
}

export default new WebApiUtils();