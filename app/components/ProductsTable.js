import React, { Component } from 'react';
import Product from './Product';

export default class ProductsTable extends Component {
	
	render(){		
			var rows = [];
			this.props.products.forEach( (product)=> {
				rows.push(<Product product={product} key={product.name} />);
			});
			
		return (
				<table>
					<thead>
						<tr>
							<td>name</td>
							<td>sku</td>
							<td>sale price</td>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</table>
			);
	}
}