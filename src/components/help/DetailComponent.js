'use strict';

import React from 'react';

require('styles/help/Detail.scss');


class DetailComponent extends React.Component {
    render() {
		const mock_article = this.props.location.state.htmlContent;
		const date = (() => {
					let fragment = (new Date(Number(this.props.location.state.date))).toString().split(' ');
					return (fragment[1] + ' ' + fragment[2] + ', ' + fragment[3]);
				})();
        return (
        	<div className="detail-component">
        		<div className="detail-title">{this.props.location.state.title}</div>
        		<div className="detail-author">{this.props.location.state.author}</div>
        		<div className="detail-date">{date}</div>
        		<hr/>
		    	<div dangerouslySetInnerHTML = {{__html: mock_article}}>
		        </div>
            </div>
        );
    }
}

DetailComponent.displayName = 'HelpDetailComponent';

// Uncomment properties you need
// DetailComponent.propTypes = {};
// DetailComponent.defaultProps = {};

export default DetailComponent;
