'use strict';

import React from 'react';
import Logo from './Logo';
import CornerClosePanel from './CornerClose';

const InfoPanel = ({title, content, onToggleInfoWindow, createHTML}) => {
  return (
    <div id="info-pad">
      <CornerClosePanel onToggleInfoWindow={onToggleInfoWindow}/>
      <h2>{title}</h2>
      <Logo/>

      {content ? (
        <p id="info-content">
          {content}
        </p>
      ) : null}

      {createHTML ? <div id="embededHTML" dangerouslySetInnerHTML={createHTML()}/> : null}
    </div>
  );
}

export default InfoPanel;
