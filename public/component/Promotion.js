import React, {Component} from 'react';
import {PromotionList} from '../rest/PromotionRestful';

class PromotionPanel extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      promotions: []
    }
  }

  componentDidMount(){
    PromotionList((err, data)=>{
      if(err)throw err;
      this.setState({promotions: data.promotions, isLoaded: true});
    })
  }

  render(){
    const {isLoaded, promotions} = this.state;

    const promotionPad = (isLoaded && promotions.length) ?
    promotions.map((prom, index)=>
      <div className="promotion-pad" key={index}>
        <img src="./resource/promotion/mars.jpeg" className="promotion-img"/>
        <h4 className="promotion-desc">
          {prom.desc}
          <span className="amazing-price">
          {prom.price}
          </span>。
          <a href="#">去看看</a>
        </h4>
      </div>
    )
    : null;

    const loadingStatus = (isLoaded && promotions.length) ?
    'PROMOTIONS' : <span className="loadingStatus"><strong>{'LOADING'}</strong></span>;

    return(
      <div id="promotion">
        <h2 id="promotion-header">本月特惠 - {loadingStatus}</h2>
        <div id="promotion-info">
          {promotionPad}
        </div>
      </div>
    );
  }
}

export default PromotionPanel;
