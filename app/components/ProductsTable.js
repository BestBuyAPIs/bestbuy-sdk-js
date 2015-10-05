import React, { Component } from 'react';
import Product from './Product';

export default class ProductsTable extends Component {
	
	render(){		
			var rows = [];
			this.props.products.forEach( (product)=> {
				rows.push(<Product product={product} key={product.name} />);
			});
			
		return (
				<table className="table-bordered table">
					<thead>
						<tr>
							<td className="col-md-8"><strong>Name</strong></td>
							<td className="col-md-2"><strong>SKU</strong></td>
							<td className="col-md-2"><strong>Sale Price</strong></td>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</table>
			);
	}
}