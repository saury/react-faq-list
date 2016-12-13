'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'
import LoadingComponent from '../public/LoadingComponent';
// 2 way binding helper
// import LinkedStateMixin from 'react-addons-linked-state-mixin';

require('styles/help/List.scss');

var getJSON = function(url) {
  var promise = new Promise(function(resolve, reject){
    var client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.setRequestHeader('Accept', 'application/json');
    client.send();

    function handler() {
		if (this.readyState !== 4) {
		return;
		}
		if (this.status === 200) {
		resolve(this.response);
		} else {
		reject(new Error(this.statusText));
		}
    }
  });

  return promise;
};

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
			virgin: true,
			searchValue: '',
			dataFiltered: []
		}
		this.handleUserInput = this.handleUserInput.bind(this);
	}
	handleUserInput(data) {
	    this.setState({
	        searchValue: data.searchValue,
	        dataFiltered: this.handleData(this.state.dataFiltered, data.searchValue)
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
	handleRawData(data){
		let result = [];
		console.log(data.Items);
		data.Items.map(function(item){
			result.push({
				title: item.Title,
				url: item.Id
			})
		})
		console.log(result);
		this.setState({
			virgin: false,
			dataFiltered: result
		})
	}
	render() {
		const _self = this;
		if(this.state.virgin){
			getJSON('http://cnshhq-e1dev100:8000/Zendesk/TBV3/GetArticles').then(
			function(data) {
				console.log('pooque');
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
