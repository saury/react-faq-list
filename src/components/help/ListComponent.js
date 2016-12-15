'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

import config from 'config';
import LoadingComponent from '../public/LoadingComponent';
import http from '../public/httpRequest';
// 2 way binding helper
// import LinkedStateMixin from 'react-addons-linked-state-mixin';

require('styles/help/List.scss');

// top search bar
class ListSearchBar extends React.Component {
	constructor(props) {
	    super(props);
	    this.handleChange = this.handleChange.bind(this);
	}
	// callback to filter the list according to the input value
	handleChange() {
	    this.props.searchOperation({
	        searchValue: ReactDOM.findDOMNode(this.refs.filterNameInput).value
	    });
	}
	render(){
		return (
			<div className="list-search-bar">
				<input
					type="text" placeholder="Search"
					value={this.props.searchValue}
					onChange={this.handleChange}
					ref="filterNameInput"
				/>
			</div>
		)
	}
}

// each list item
class ListItem extends React.Component {
	constructor(props) {
		super(props);
	}
	handleLink(){
		// display the loading icon
		this.props.cb(true);
	    const path = '/faq/' + this.props.url;
	    const _props = this.props;
	    http.get(config.apiAuthor(this.props.url)).then(
	    function(data) {
	    	// link to the detail page
		    browserHistory.push({
		    	pathname: path,
		    	// params need to pass, but not to show on the url path
		    	state: {
		    		title: _props.title,
		    		author: data.Name || 'unknown',
		    		date: _props.date,
		    		htmlContent: _props.body
		    	}
		    })
	    }, function(error) {
	    	throw 'error info:'+error+', try refreshing the page';
	    })
	}
	render(){
		return (
			<li className="list-item" onClick={() => this.handleLink()}>
				{this.props.title}
			</li>
		)
	}
}

// list container
class ListContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showAll: false,
			showLoading: false
		}
		this.showAllItems = this.showAllItems.bind(this);
		this.handleCallback = this.handleCallback.bind(this);
	}
	// show all the list items
	showAllItems(){
		this.setState({
			showAll: true
		})
	}
	// callback to show the loading icon
	handleCallback(bool){
		this.setState({
			showLoading: bool
		})
	}
	render(){
		let result;
		// display all the list item when the showAll state is triggered
		if(!!this.state.showAll){
			result = this.props.resultData.map((_data, idx) => <ListItem cb={this.handleCallback} key={idx} body={_data.body} date={_data.date} url={_data.url} title={_data.title} />)
		}
		// else, only 5 items display
		else {
			result = this.props.resultData.slice(0,5).map((_data, idx) => <ListItem cb={this.handleCallback} key={idx} body={_data.body} date={_data.date} url={_data.url} title={_data.title} />)
		}
		return (
			<ul className="list-container">
				{result}
				<li className="list-more" style={{display: this.props.resultData.length > 5 && !this.state.showAll ? 'block' : 'none'}} onClick={() => this.showAllItems()}>
					Show all {this.props.resultData.length} articles
				</li>
				<li style={{display: this.props.resultData.length === 0 ? 'block' : 'none', textAlign: 'center'}}>
					<strong>Nothing found</strong>
				</li>
				<div style={{display: this.state.showLoading?'flex':'none'}} className="inner-loading"><LoadingComponent /></div>
			</ul>
		)
	}
}

// the main component need to export
class ListComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			virgin: true,
			searchValue: '',
			dataRaw: [],
			dataFiltered: []
		}
		this.handleUserInput = this.handleUserInput.bind(this);
	}
	// set the input value and reset the filtered data to get the right list items display
	handleUserInput(data) {
	    this.setState({
	        searchValue: data.searchValue,
	        dataFiltered: this.handleData(this.state.dataRaw, data.searchValue)
	    });
	}
	// the help fn for function above
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
	// parser handle with the raw data
	handleRawData(data){
		let result = [];
		data.Items.map(function(item){
			result.push({
				title: item.Title,
				body: item.Body,
				date: (item.LastUpdatedStamp).match(/\d{13}/)[0],
				url: item.Id
			})
		})
		this.setState({
			virgin: false,
			dataRaw: result,
			dataFiltered: result
		})
	}
	render() {
		const _self = this;
		if(this.state.virgin){
			http.get(config.apiList()).then(
			function(data) {
				_self.handleRawData(data);
			}, function(error) {
				throw 'error info:'+error+', try refreshing the page';
			})
		}
		return (
		  <div className="list-component">
		    <ListSearchBar searchValue={this.state.searchValue} searchOperation={this.handleUserInput}/>
		    <ListContainer resultData={this.state.dataFiltered}/>
		  	<div style={{display: this.state.virgin?'flex':'none'}} className="list-loading"><LoadingComponent /></div>
		  </div>
		);
	}
}

ListComponent.displayName = 'HelpListComponent';

// Uncomment properties you need
// ListComponent.propTypes = {};
// ListComponent.defaultProps = {};

export default ListComponent;
