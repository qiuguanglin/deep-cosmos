import React, {Component} from 'react';

class PromotionPanel extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      promotions: []
    }
  }

  componentDidMount(){
    const fakeData = {
      desc: '火星五天四夜游，攀登火星最高峰奥林匹斯山，黄昏浪漫看日落，早上温馨看地出，来回飞船价钱',
      price: 40000
    };

    setTimeout(()=>{
      this.setState({promotions: [fakeData, fakeData, fakeData], isLoaded: true});
    }, 3000);
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
