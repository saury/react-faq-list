'use strict';

import React from 'react';

require('styles/public/Loading.scss');

class LoadingComponent extends React.Component {
  render() {
    return (
      <div className="loading-icon"></div>
    );
  }
}

LoadingComponent.displayName = 'PublicLoadingComponent';

// Uncomment properties you need
// LoadingComponent.propTypes = {};
// LoadingComponent.defaultProps = {};

export default LoadingComponent;
