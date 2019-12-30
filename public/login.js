import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class LoginPanel extends Component{
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
      <div id="main">
        <div id="tabs">
          <Logo/>
          <button onClick={this.onToggle.bind(this, true)} className={toggled ? 'onFocus' : null}>登陆</button>
          <button onClick={this.onToggle.bind(this, false)} className={toggled ? null : 'onFocus'}>新账号</button>
          <div id="tab-content">
            {toggled ? <Login/> : <Regedit/>}
          </div>
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

const Notation = ({notationClass}) => <h4 className={notationClass}>账号或者密码不正确</h4>

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      notationClass: 'normal'
    }

    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onSubmitHandler(e){
    e.preventDefault();
    const {username, password} = this.state;
    if(!username || !password){
      this.setState({notationClass: 'alarm'});
      return;
    }
    //submit to backend
  }

  onUserNameChange(e){
    this.setState({username: e.target.value});
    this.clearNotation();
  }

  onPasswordChange(e){
    this.setState({password: e.target.value});
    this.clearNotation();
  }

  clearNotation(){
    this.setState({notationClass: 'normal'});
  }

  render(){
    const {username, password, notationClass} = this.state;
    return(
      <div id="login-panel">
        <form onSubmit={this.onSubmitHandler}>
          <input size="40" className="textField" value={username} placeholder="账号" onChange={this.onUserNameChange} required/><p/>
          <input size="40" className="textField" type="password" value={password} placeholder="密码" onChange={this.onPasswordChange} required/><p/>
          <Notation notationClass={notationClass}/>
          <h4 id="forget-pass">忘记密码?</h4>
          <input type="submit" className="submit" value="登陆"/>
        </form>
      </div>
    );
  }
}

class Regedit extends Component{
  constructor(){
    super();
  }

  render(){
    return(
      <div id="regedit">
        <form>
          <input size="40" className="textField" placeholder="邮箱/手机" required/><p/>
          <input size="40" className="textField" type="password" placeholder="密码" required/><p/>
          <p>
          * 密码必须是6-12位<br/>
          * 数字、字母、特殊字符的组合<br/>
          * 至少有一个大写字母
          </p>
          <input type="submit" className="submit" value="注册"/>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<LoginPanel/>, document.getElementById('login-page'));
