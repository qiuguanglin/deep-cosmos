import React, {Component} from 'react';

const imgList  = [
  {desc: 'Model－X1海盗一号，核聚变六通道加速，最高时速达光速80%', img: 'shuttle0.jpg'},
  {desc: 'Model－X1海盗一号，核聚变六通道加速，最高时速达光速80%', img: 'shuttle1.jpg'},
  {desc: 'Model－X1海盗一号，核聚变六通道加速，最高时速达光速80%', img: 'shuttle2.jpg'},
  {desc: 'Model－X1海盗一号，核聚变六通道加速，最高时速达光速80%', img: 'shuttle3.jpg'}
];

class TopPanel extends Component{
  constructor(){
    super();
    this.state = {
      currentImg: imgList[0]
    }
  }

  componentDidMount(){
    const timer = setInterval(()=>{
      const image = imgList[Math.floor(Math.random() * imgList.length)];
      this.setState({currentImg: image});
    }, 4000);

    this.timer = timer;
  }

  componentWillUnmount(){
    if(this.timer){
      clearInterval(this.timer);
    }
  }

  render(){
    return(
      <div id="topPanel">
        <div id="logo">
          Deep Cosmos
        </div>
        <div id="description">
          <h1 id="desc-title"><span id="caption">深空</span>星际</h1>
          <h2>
            选择深空，带您游弋浩瀚星际<br/>
            选择深空，带您穿越时间和空间<br/>
            选择深空，让您拥有前所未有的舒适<br/>
            <p>跟随我们，现在开启旅程吧！</p>
          </h2>
        </div>
        <SlideWindow img={this.state.currentImg}/>
      </div>
    );
  }
}

const SlideWindow = ({img})=>{
  return(
    <div id="img-window">
      <img src={`./resource/${img.img}`} className="display-img"/><br/>
      <h4 className="display-desc">{img.desc}</h4>
    </div>
  );
}

export default TopPanel;
