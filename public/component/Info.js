import React from 'react';
import Logo from './Logo';

const InfoPanel = ({title, content, onToggleInfoWindow, createHTML}) => {
  return (
    <div id="info-pad">
      <h2>{title}</h2>
      <Logo/>
      <p>
        {content}
      </p>
      
      {createHTML ? <div id="embededHTML" dangerouslySetInnerHTML={createHTML()}/> : null}

      <div id="info-close">
        <button onClick={onToggleInfoWindow}>关闭</button>
      </div>
    </div>
  );
}

export default InfoPanel;
