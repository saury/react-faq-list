'use strict';

import React from 'react';
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
      this.state = {
        value: '',
        pressEnter: false
      }
      this.handleEnter = this.handleEnter.bind(this);
	    this.handleChange = this.handleChange.bind(this);
	}
	// callback to filter the list according to the input value once enter btn clicked
	handleEnter(e) {
    // prevent call the callback fn many times
    if(this.state.pressEnter) return;
    if(e.keyCode === 13){
	    this.props.cbRequestBySearch(this.state.value);
    }
	}
  // sync the input words
  handleChange(event) {
    this.setState({value: event.target.value});
  }
	render(){
		return (
			<div className="list-search-bar">
				<input
					type="text" placeholder="Search"
					value={this.state.value}
					onKeyUp={this.handleEnter}
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
			showAllLoading: false,
			showDetailLoading: false
		}
		this.showAllItems = this.showAllItems.bind(this);
		this.handleCallback = this.handleCallback.bind(this);
	}
	// show all the list items
	showAllItems(){
    // show the loading icon
		this.setState({
			showAllLoading: true
		})
    this.props.cbLoadAll();
	}
	// callback to show the loading icon
	handleCallback(bool){
		this.setState({
			showDetailLoading: bool
		})
	}
	render(){
		let result = this.props.resultData.map((_data, idx) => <ListItem cb={this.handleCallback} key={idx} body={_data.body} date={_data.date} url={_data.url} title={_data.title} />)

		return (
			<ul className="list-container">
				<div className="list-result-conclude" style={{display: this.props.keywords ? 'block' : 'none'}}>
					{this.props.resultData.length || 'No'} Results for "{this.props.keywords}"
				</div>
        <div className="list-no-result" style={{display: this.props.resultData.length === 0 ? 'block' : 'none'}}>
          There are no results for "{this.props.keywords}"
          <div className="btn" onClick={() => this.showAllItems()}>Browse Knowledge Base</div>
        </div>
        {result}
        <li className="list-more" style={{display: this.props.hasMore > 0 ? 'block' : 'none'}} onClick={() => this.showAllItems()}>
          <span>
            <i style={{display: this.state.showAllLoading?'block':'none'}} className="loading-status" ><LoadingComponent /></i>
            Show all {this.props.hasMore + this.props.resultData.length} articles
          </span>
        </li>
				<div style={{display: this.state.showDetailLoading?'flex':'none'}} className="inner-loading"><LoadingComponent /></div>
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
			dataRaw: [],
			dataFiltered: [],
      keywords: '',
      hasMore: 0
		}
    this.handleUserInput = this.handleUserInput.bind(this);
		this.requestAll = this.requestAll.bind(this);
	}
	// set the input value and reset the filtered data to get the right list items display
	handleUserInput(keyword) {
    const _self = this;
    http.get(config.apiSearch(keyword)).then(
    function(data) {
      _self.handleRawData(data);
      _self.setState({
        keywords: keyword
      })
    }, function(error) {
      throw 'error info:'+error+', try refreshing the page';
    })
	}
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
			dataFiltered: result,
      // reset the key words to hide the search result
      keywords: '',
      hasMore: data.TotalCount - data.PageSize
		})
	}
  // request all the data
  requestAll(limit){
    let query = limit ? ('&count=' + limit) : '';
    const _self = this;
    http.get(config.apiList() + query).then(
    function(data) {
      _self.handleRawData(data);
    }, function(error) {
      throw 'error info:'+error+', try refreshing the page';
    })
  }

  render() {
    // request 5 items at the first time
    if(this.state.virgin) this.requestAll(5);
		return (
		  <div className="list-component">
		    <ListSearchBar cbRequestBySearch={this.handleUserInput}/>
		    <ListContainer keywords={this.state.keywords} cbLoadAll={this.requestAll} hasMore={this.state.hasMore} resultData={this.state.dataFiltered}/>
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
