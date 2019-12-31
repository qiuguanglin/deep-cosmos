import React, {Component} from 'react';
import RegeditPanel from './Regedit';
import LoginPanel from './Login';

class SigninPanel extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const {onClosingSigninBox} = this.props;
    return(
      <div id="signin">
        <label id="closeSigninBox" onClick={onClosingSigninBox}>X</label>
        <AccountPanel />
      </div>
    );
  }
}

class AccountPanel extends Component{
  constructor(){
    super();
    this.state = {
      toggled: true
    }
  }

  onToggle(flag){
    this.setState({toggled: flag});
  }

  render(){
    const {toggled} = this.state;
    return(
      <div id="tabs">
        <Logo/>
        <button onClick={this.onToggle.bind(this, true)} className={toggled ? 'onFocus' : null}>登陆</button>
        <button onClick={this.onToggle.bind(this, false)} className={toggled ? null : 'onFocus'}>新账号</button>
        <div id="tab-content">
          {toggled ? <LoginPanel/> : <RegeditPanel/>}
        </div>
      </div>
    );
  }
}

const Logo = ()=> (
  <h4 id="legend">
    <label id="deep">
      <span style={{fontSize: '60px'}}>D</span>
      <span style={{fontSize: '30px'}}>eep</span>
    </label>
    <label id="cosmos">
      <span style={{fontSize: '30px'}}>C</span>
      osmos
    </label>
  </h4>
);

export default SigninPanel;
