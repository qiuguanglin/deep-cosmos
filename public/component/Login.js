import React, {Component} from 'react';

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
    //try login
    if(true){
      this.setState({message: '账号或密码不正确'});
    }else{
      //jump to index
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
