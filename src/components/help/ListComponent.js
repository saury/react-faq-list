'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'
// 2 way binding helper
// import LinkedStateMixin from 'react-addons-linked-state-mixin';

require('styles/help/List.scss');

const mock_data = [
	{
	'title': 'Article #1',
	'url': 'link_1'
	},
	{
	'title': 'Article #2',
	'url': 'link_2'
	},
	{
	'title': 'Article #3',
	'url': 'link_3'
	},
	{
	'title': 'Article #4',
	'url': 'link_4'
	},
	{
	'title': 'Article #5',
	'url': 'link_5'
	},
	{
	'title': 'Article #6',
	'url': 'link_6'
	},
	{
	'title': 'Article #7',
	'url': 'link_7'
	},
	{
	'title': 'Article #8',
	'url': 'link_8'
	},
	{
	'title': 'Article #9',
	'url': 'link_9'
	},
	{
	'title': 'Article #10',
	'url': 'link_10'
	},
	{
	'title': 'Article #11',
	'url': 'link_11'
	},
	{
	'title': 'Article #12',
	'url': 'link_12'
	},
	{
	'title': 'Article #13',
	'url': 'link_13'
	},
	{
	'title': 'Article #14',
	'url': 'link_14'
	},
	{
	'title': 'Article #15',
	'url': 'link_15'
	},
	{
	'title': 'Article #16',
	'url': 'link_16'
	},
	{
	'title': 'Article #17',
	'url': 'link_17'
	},
	{
	'title': 'Article #18',
	'url': 'link_18'
	},
	{
	'title': 'Article #19',
	'url': 'link_19'
	},
	{
	'title': 'Article #20',
	'url': 'link_20'
	},
	{
	'title': 'Article #21',
	'url': 'link_21'
	},
	{
	'title': 'Article #22',
	'url': 'link_22'
	},
	{
	'title': 'Article #23',
	'url': 'link_23'
	},
	{
	'title': 'Article #24',
	'url': 'link_24'
	},
	{
	'title': 'Article #25',
	'url': 'link_25'
	},
	{
	'title': 'Article #26',
	'url': 'link_26'
	},
	{
	'title': 'Article #27',
	'url': 'link_27'
	},
	{
	'title': 'Article #28',
	'url': 'link_28'
	},
	{
	'title': 'Article #29',
	'url': 'link_29'
	},
	{
	'title': 'Article #30',
	'url': 'link_30'
	},
	{
	'title': 'Article #31',
	'url': 'link_31'
	},
	{
	'title': 'Article #32',
	'url': 'link_32'
	},
	{
	'title': 'Article #33',
	'url': 'link_33'
	},
	{
	'title': 'Article #34',
	'url': 'link_34'
	},
	{
	'title': 'Article #35',
	'url': 'link_35'
	},
	{
	'title': 'Article #36',
	'url': 'link_36'
	},
	{
	'title': 'Article #37',
	'url': 'link_37'
	},
	{
	'title': 'Article #38',
	'url': 'link_38'
	},
	{
	'title': 'Article #39',
	'url': 'link_39'
	},
	{
	'title': 'Article #40',
	'url': 'link_40'
	}
]

class ListSearchBar extends React.Component {
	constructor(props) {
	    super(props);
	    this.handleChange = this.handleChange.bind(this);
	}
	handleChange() {
	    this.props.searchOperation({
	        searchValue: ReactDOM.findDOMNode(this.refs.filterNameInput).value
	    });
	}
	render(){
		return (
			<div className="list-search-bar">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="40" height="40" aria-labelledby="search icon">
					<line x1="30" y1="30" x2="85" y2="85" stroke="#999" strokeWidth="4"/>
					<circle r="20" cx="40" cy="40" fill="#fff" stroke="#999" strokeWidth="4"/>
		        </svg>
				<input  type="text" placeholder="Search" value={this.props.searchValue} onChange={this.handleChange} ref="filterNameInput"
				/>
			</div>
		)
	}
}

class ListItem extends React.Component {
	render(){
		return (
			<li className="list-item">
				<Link to={'/faq/' + this.props.url}>
					{this.props.title}
				</Link>
			</li>
		)
	}
}

class ListContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showAll: false
		}
		this.showAllItems = this.showAllItems.bind(this);
	}
	showAllItems(){
		this.setState({
			showAll: true
		})
	}
	render(){
		let result;
		if(!!this.state.showAll){
			result = this.props.resultData.map((_data, idx) => <ListItem key={idx} url={_data.url} title={_data.title} />)
		}
		else {
			result = this.props.resultData.slice(0,5).map((_data, idx) => <ListItem key={idx} url={_data.url} title={_data.title} />)
		}
		return (
			<ul className="list-container">
				{result}
				<li style={{display: this.props.resultData.length > 5 && !this.state.showAll ? 'block' : 'none'}} onClick={() => this.showAllItems()}>
					<strong>See more {this.props.resultData.length - 5} articles</strong>
				</li>
				<li style={{display: this.props.resultData.length === 0 ? 'block' : 'none', textAlign: 'center'}}>
					<strong>Nothing found</strong>
				</li>
			</ul>
		)
	}
}

class ListComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: '',
			dataFiltered: mock_data
		}
		this.handleUserInput = this.handleUserInput.bind(this);
	}
	handleUserInput(data) {
	    this.setState({
	        searchValue: data.searchValue,
	        dataFiltered: this.handleData(mock_data, data.searchValue)
	    });
	}
	handleData(data, filter) {
		let result = [];
		data.forEach((item) => {
			if (item.title.toLowerCase().indexOf(filter.toLowerCase()) === -1) {
				return;
			}
			result.push(item);
		});
		return result;
	}
	render() {
		return (
		  <div className="list-component">
		    <ListSearchBar searchValue={this.state.searchValue} searchOperation={this.handleUserInput}/>
		    <ListContainer resultData={this.state.dataFiltered}/>
		  </div>
		);
	}
}

ListComponent.displayName = 'HelpListComponent';

// Uncomment properties you need
// ListComponent.propTypes = {};
// ListComponent.defaultProps = {};

export default ListComponent;
