'use strict';

import React from 'react';

require('styles/public/Loading.scss');

// use plain function fot there's no state or refs
function LoadingComponent(){
  return <div className="loading-icon"></div>
}

export default LoadingComponent;
