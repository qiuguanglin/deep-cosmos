import React, {Component} from 'react';
import {LoginUser} from '../rest/UserRestful';

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
        if(err)return this.setState({message: '服务器错误，请稍后再试'});
        if(!data.success)return this.setState({message: '账号或密码不正确'});

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
          <input size="40" className="textField" value={username} placeholder="账号" onChange={this.onUserNameChange} required/><p/>
          <input size="40" className="textField" type="password" value={password} placeholder="密码" onChange={this.onPasswordChange} required/><p/>
          <span className="notation">{message}</span>
          <h4 className="hint">忘记密码?</h4>
          <input type="submit" className="submit" value="登陆"/>
        </form>
      </div>
    );
  }
}

export default LoginPanel;
