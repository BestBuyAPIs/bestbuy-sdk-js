import React, {Component} from 'react';
import ProductsTable from './ProductsTable';
import ProductsStore from '../stores/ProductsStore';
import ProductsActions from '../actions/ProductsActions';


export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = ProductsStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		ProductsStore.listen(this.onChange);
		ProductsActions.getProducts(null);
	}

	conponentWillUnmount() {
		ProductsStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		
		return (
			<div>
				<ProductsTable products={this.state.products} /> 
			</div>
		);
	}
}




