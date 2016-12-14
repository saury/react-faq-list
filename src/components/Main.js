require('normalize.css/normalize.css');
require('styles/App.css');
// require('styles/help/Nav.scss');

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import ListComponent from './help/ListComponent';
import DetailComponent from './help/DetailComponent';

import { Router, Route, browserHistory } from 'react-router'

// class Nav extends React.Component {
// 	render() {
// 	  return (
// 	    <ul className='navigation'>
// 	    	<li>Back</li>
// 	    	<li><strong>FAQ</strong></li>
// 	    	<li>Close</li>
// 	    </ul>
// 	  );
// 	}
// }

const App = ({ children, location }) => (
  <div>
    <ReactCSSTransitionGroup
      component="div"
      transitionName="router-transition"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
    >
      {React.cloneElement(children, {
        key: location.pathname
      })}
    </ReactCSSTransitionGroup>
  </div>
)

class AppComponent extends React.Component {
  render() {
    return (
    	<Router history={browserHistory}>
	    	<Route path="/" component={App}>
	    	  	<Route path="/faq" component={ListComponent}/>
	    	  	<Route path="/faq/:articleName" component={DetailComponent}/>
    	  	</Route>
    	</Router>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
