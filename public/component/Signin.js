import React, {Component} from 'react';
import RegeditPanel from './Regedit';
import LoginPanel from './Login';
import Logo from './Logo';
import {FormattedMessage} from 'react-intl';

class SigninPanel extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const {onClosingSigninBox, onSigninStatus} = this.props;
    return(
      <div id="signin">
        <label id="closeSigninBox" onClick={onClosingSigninBox}>X</label>
        <AccountPanel onSigninStatus={onSigninStatus}/>
      </div>
    );
  }
}

class AccountPanel extends Component{
  constructor(props){
    super(props);
    this.state = {
      toggled: true
    }

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(){
    const isToggled = this.state.toggled;
    this.setState({toggled: !isToggled});
  }

  render(){
    const {toggled} = this.state;
    const {onSigninStatus} = this.props;

    return(
      <div id="tabs">
        <Logo/>
        <button onClick={this.onToggle} className={toggled ? 'onFocus' : null}><FormattedMessage id="login-tab-login"/></button>
        <button onClick={this.onToggle} className={toggled ? null : 'onFocus'}><FormattedMessage id="login-tab-regedit"/></button>
        <div id="tab-content">
          {
            toggled ? <LoginPanel onSigninStatus={onSigninStatus}/> :
           <RegeditPanel onSigninStatus={onSigninStatus}/>
         }
        </div>
      </div>
    );
  }
}

export default SigninPanel;
