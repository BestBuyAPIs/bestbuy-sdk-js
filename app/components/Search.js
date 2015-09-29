import React, { Component } from 'react';
import ProductsTable from 'ProductsTable'

export default class Search extends Component {
	render{
		return (
				<div>
					<ProductsTable products={this.props.products} />
				</div>
			);
	}
}