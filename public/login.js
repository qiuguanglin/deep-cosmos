import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const Notation = ({notationClass}) => <h4 className={notationClass}>账号或者密码不正确</h4>

class LoginPanel extends Component{
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
        <h4 id="legend">
          <label id="deep"><span className="capital">D</span>eep</label>
          <label id="cosmos">Cosmos</label>
        </h4>
        <form onSubmit={this.onSubmitHandler}>
          <input size="40" className="textField" value={username} placeholder="账号" onChange={this.onUserNameChange} required/><p/>
          <input size="40" className="textField" type="password" value={password} placeholder="密码" onChange={this.onPasswordChange} required/><p/>
          <Notation notationClass={notationClass}/>
          <h4 id="forget-pass">忘记密码?</h4>
          <input type="submit" className="submit"/>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<LoginPanel/>, document.getElementById('login-page'));
