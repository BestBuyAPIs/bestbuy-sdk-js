import React, { Component } from 'react';
import ProductActions from '../actions/ProductsActions';


export default class Paging extends Component {

	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(action, e) {
		var search = this.props.search;
		var page = 1;
		switch(action){
			case "first":
			break;
			case "next":
				page = ((this.props.pages.current+1) < this.props.pages.total) ?  (this.props.pages.current+1) : this.props.pages.total;
			break;

			case "prev":
				page = ((this.props.pages.current-1) > 1) ? (this.props.pages.current-1) : 1;
			break;

			case "last":
				page = this.props.pages.total;
			break;
		}
		var qs = {pageSize:(this.props.pages.items.to - this.props.pages.items.from +1), page: page};
		ProductActions.getProducts(search,qs); 
	}

	render(){
		var pageList = [];
		var pageSize;
		if (this.props.pages.items)
			pageSize = (this.props.pages.items.to - this.props.pages.items.from +1);

		pageList.push(<span><a onClick={this.handleChange.bind(null, "first")}>First</a> | </span>);
		pageList.push(<span><a onClick={this.handleChange.bind(null, "prev")}>Prev</a> | </span>);
		pageList.push(<span><a onClick={this.handleChange.bind(null, "next")}>Next</a> | </span>);
		pageList.push(<span><a onClick={this.handleChange.bind(null, "last")}>Last</a></span>);

		return (
			<div>
				<p>On page <strong>{this.props.pages.current}</strong> of <strong>{this.props.pages.total}</strong> total pages. Showing <strong>{pageSize}</strong> products per page.</p>
				{pageList}
			</div>
			);
	}
}