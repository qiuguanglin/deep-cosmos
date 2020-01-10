import React, {Component} from 'react';

class TopPanel extends Component{
  constructor(){
    super();
  }

  render(){
    return(
      <div id="topPanel">
        <h1>
          <span id="top-logo1">深空</span>
          <span id="top-logo2">星际</span>
        </h1>
        <h2>
          旅行旅行到宇宙边缘
        </h2>
        <h3>
          <img src="../resource/cosmos.png"/>
        </h3>
      </div>
    );
  }
}

export default TopPanel;
