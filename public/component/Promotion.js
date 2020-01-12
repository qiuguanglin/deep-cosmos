import React, {PureComponent} from 'react';
import {PromotionList} from '../rest/PromotionRestful';

class PromotionPanel extends PureComponent{
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
    const {currencyFormatRegx, language} = this.props;
    const isEn = language !== 'zh';

    const promotionPad = (isLoaded && promotions.length) ?
    promotions.map(prom =>
      <div className="promotion-pad" key={prom.id}>
        <img src={`./resource/promotion/${prom.id}.jpg`}/>
        <h4 className="promotion-desc">
          <span className="promotion-title">{isEn ? prom['en-title'] : prom.title}</span>
          <br/>
          <span className="promotion-detail">{isEn ? prom['en-detail'] : prom.detail}</span>
          <br/>
          <span className="amazing-price">
            {(isEn ? ['On Sale', 'Low Price', 'Sold At'] : ['惊爆价', '低至', '特价'])[parseInt(Math.random() * 3)]}
            {prom.price.toFixed(2).replace(currencyFormatRegx, '$1,')}
          </span>
        </h4>
      </div>
    )
    : null;

    const loadingStatus = (!isLoaded || !promotions.length) ?
    <h3 className="loadingStatus">{language === 'zh' ? '加载中...' : 'Loading...'}</h3> : null;

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
