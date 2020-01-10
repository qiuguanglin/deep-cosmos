import React, {Component} from 'react';
import {LoginUser} from '../rest/UserRestful';
import {FormattedMessage} from 'react-intl';
import GeneralInputPanel from './GeneralInput';
import GeneralButtonPanel from './GeneralButton';

class LoginPanel extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      message: ''
    }

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onSubmitHandler(e){
    e.preventDefault();
    const {username, password} = this.state;
    const {onSigninStatus} = this.props;

    if(username && password){
      LoginUser(username, password, (err, data)=>{
        if(err)return this.setState({message: <FormattedMessage id="login-server-err"/>});
        if(!data.success)return this.setState({message: <FormattedMessage id="login-err-message"/>});

        const displayingName = data.message.nickname || data.message.username;
        onSigninStatus({isSuccess: data.success, displayingName});
      });
    }
  }

  onUserNameChange(e){
    this.setState({username: e.target.value});
  }

  onPasswordChange(e){
    this.setState({password: e.target.value});
  }

  render(){
    const {username, password, message} = this.state;
    return(
      <div id="login-panel">
        <form onSubmit={this.onSubmitHandler}>
          <GeneralInputPanel size="40" className="textField" value={username}
          placeholder="login-field-username" onChange={this.onUserNameChange} required="required"/><p/>

          <GeneralInputPanel size="40" className="textField" type="password"
          value={password} placeholder="login-field-password" onChange={this.onPasswordChange} required="required"/><p/>

          <span className="notation">{message}</span>
          <h4 className="hint"><FormattedMessage id="login-forgotten"/></h4>

          <GeneralButtonPanel type="submit" className="submit" value="login-button"/>
        </form>
      </div>
    );
  }
}

export default LoginPanel;
