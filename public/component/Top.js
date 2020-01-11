import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';

class TopPanel extends Component{
  constructor(){
    super();
  }

  render(){
    return(
      <div id="topPanel">
        <h1>
          <span><FormattedMessage id="top-logo1"/></span>
          <span><FormattedMessage id="top-logo2"/></span>
        </h1>
        <h2>
          <span><FormattedMessage id="top-h2-left"/></span>
          <span><FormattedMessage id="top-h2-right"/></span>
        </h2>
        <h3>
          <img src="../resource/cosmos.png"/>
        </h3>
      </div>
    );
  }
}

export default TopPanel;
