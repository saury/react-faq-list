'use strict';

import React from 'react';

require('styles/help/Detail.css');


class DetailComponent extends React.Component {
    render() {
		const mock_article = '<div style="color: red">\
									<span>'+this.props.params.articleName+'</span>\
									<span style="text-decoration: underline; color: lime"> too young too simple</span>\
									<span style="font-weight: 700; color: #ccc"> too young too simple</span>\
								</div>';
        return (
        	<div style={{height: '200px'}}>
	        	<div className = "detail-component" dangerouslySetInnerHTML = {{__html: mock_article}}>
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
