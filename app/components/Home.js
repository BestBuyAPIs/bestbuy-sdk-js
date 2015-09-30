import React, {Component} from 'react';
import ProductsTable from './ProductsTable';
import ProductsStore from '../stores/ProductsStore';
import ProductsActions from '../actions/ProductsActions';
import Categories from './Categories';
import CategoriesStore from '../stores/CategoriesStore';
import CategoriesActions from '../actions/CategoriesActions';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = this.getStateFromStores();
		this.onChange = this.onChange.bind(this);
	}

	getStateFromStores() {
		return {
			products: ProductsStore.getState().products,
			categories: CategoriesStore.getState().categories
		};
	}

	componentDidMount() {
		ProductsStore.listen(this.onChange);
		CategoriesStore.listen(this.onChange);
		ProductsActions.getProducts('');
		CategoriesActions.getCategories('');
	}

	componentWillUnmount() {
		ProductsStore.unlisten(this.onChange);
		CategoriesStore.unlisten(this.onChange);
	}

	onChange(state) {
		if (state.displayName === "ProductsStore")
			this.setState({products:state.products, categories:this.state.categories});
		else if(state.displayName === "CategoriesStore")
			this.setState({products:this.state.products, categories:state.categories});
	}

	render() {
		
		return (
			<div>
				<h1>Best Buy Developer API</h1>
				<h2><i>featuring React.js, Flux architecture and Node.js</i></h2>
				<Categories categories={this.state.categories} />
				<ProductsTable products={this.state.products} /> 
			</div>
		);
	}
}