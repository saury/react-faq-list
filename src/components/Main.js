require('normalize.css/normalize.css');
require('styles/App.css');
// require('styles/help/Nav.scss');

import React from 'react';
import ListComponent from './help/ListComponent';
import DetailComponent from './help/DetailComponent';

import { Router, Route, browserHistory } from 'react-router'

class Nav extends React.Component {
	render() {
	  return (
	    <ul className='navigation'>
	    	<li>Back</li>
	    	<li><strong>FAQ</strong></li>
	    	<li>Close</li>
	    </ul>
	  );
	}
}

class AppComponent extends React.Component {
  render() {
    return (
    	<div>
	    	<Router history={browserHistory}>
	    	  	<Route path="/faq" component={ListComponent}/>
	    	  	<Route path="/faq/:articleName" component={DetailComponent}/>
	    	</Router>
    	</div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
