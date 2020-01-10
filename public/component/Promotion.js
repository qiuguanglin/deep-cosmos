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
      const promotions = data.message;
      if(promotions){
          this.setState({promotions, isLoaded: true});
      }
    })
  }

  render(){
    const {isLoaded, promotions} = this.state;
    const {currencyFormatRegx} = this.props;

    const promotionPad = (isLoaded && promotions.length) ?
    promotions.map(prom =>
      <div className="promotion-pad" key={prom.id}>
        <img src={`./resource/promotion/${prom.id}.jpg`}/>
        <h4 className="promotion-desc">
          <span className="promotion-title">{prom.title}</span>
          <span className="promotion-detail">{prom.detail}</span>
          <span className="amazing-price">
          {['惊爆价', '低至', '特价'][parseInt(Math.random() * 3)]}
          {prom.price.toFixed(2).replace(currencyFormatRegx, '$1,')}
          </span>。
          <a href="#">去看看</a>
        </h4>
      </div>
    )
    : null;

    const loadingStatus = (!isLoaded || !promotions.length) ?
    <h3 className="loadingStatus">{'加载中...'}</h3> : null;

    return(
      <div id="promotion">
        {loadingStatus}
        <div id="promotion-info">
          {promotionPad}
        </div>
      </div>
    );
  }
}

export default PromotionPanel;
