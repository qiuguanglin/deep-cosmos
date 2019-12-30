import React, {Component} from 'react';

const REGEXP_PHONE = /^1\d{10}$/;
const REGEXP_MAIL = /^\w+@(qq|126|163|tom|gmail|msn)\.com$/;
const REGEXP_SPECIAL_CHARACTER = /[\@\!\#\$\%\^\&\*\(\)\_\-\=\+\`\~\;\:\'\"\/\{\}\[\]\\\|]/;
const REGEXP_UPPERCASE = /[A-Z]/;
const REGEXP_LOWERCASE = /[a-z]/;
const REGEXP_NUMBER = /\d/;

const isPasswordValid = password =>
  REGEXP_SPECIAL_CHARACTER.test(password) &&
  REGEXP_UPPERCASE.test(password) &&
  REGEXP_LOWERCASE.test(password) &&
  REGEXP_NUMBER.test(password) &&
  password.length >= 6
  && password.length <= 12;

const isUsernameValid = username =>
  REGEXP_PHONE.test(username) || REGEXP_MAIL.test(username);

class RegeditPanel extends Component{
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      isValidated: false
    }
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onSubmitHandler(e){
    e.preventDefault();
    const {isValidated, username, password} = this.state;
    if(isValidated)
      console.log(username, password);
  }

  onUserNameChange(e){
    this.setState({username: e.target.value.trim()});
  }

  onPasswordChange(e){
    this.setState({password: e.target.value.trim()});
  }

  render(){
    const {username, password} = this.state;
    return(
      <div id="regedit">
        <form onSubmit={this.onSubmitHandler}>
          <input size="40" className="textField" placeholder="邮箱/手机"
          value={username} onChange={this.onUserNameChange}
          required/>
          {
            (username && !isUsernameValid(username)) ?
            <span className="notation"><br/>账号格式不正确</span> : null
          }
          <p/>

          <input size="40" className="textField" type="password" placeholder="密码"
          value={password} onChange={this.onPasswordChange}
          required/>
          {
            (password && !isPasswordValid(password)) ?
            <span className="notation"><br/>密码格式不正确</span> : null
          }<p/>

          <p className="hint">
            * 账号为11位手机号码或者邮箱地址<br/>
            * 密码必须是6-12位<br/>
            * 密码必须是数字、字母、特殊字符的组合<br/>
            * 密码必须包含至少有一个大写字母
          </p>
          <input type="submit" className="submit" value="注册"/>
        </form>
      </div>
    );
  }
}

export default RegeditPanel;
