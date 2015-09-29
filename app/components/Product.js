import React, { Component } from 'react';

export default class Product extends Component {
	render(){
		var name = <span>{this.props.product.name}</span>;
		var sku = <span>{this.props.product.sku}</span>;
		return (
				<tr>
					<td>{name}</td>
					<td>{sku}</td>
					</tr>		
			);
	}
}