import React from 'react';

const Navigation = ({onLanguageChanged, onLoginStatusChanged, isLoggedin})=>{
  return(
    <div id="navigation">
      {isLoggedin ? <Logout/> : <Login/>}

      <span>
        <label>语言  </label>
        <select name="languages" onChange={onLanguageChanged}>
          <option value="ch">简体中文</option>
          <option value="en">英文</option>
        </select>
      </span>
  </div>)
}

const Logout = ()=><span>退出</span>;

const Login = ()=>{
  return(
    <span>
        <a href="#"><img src="./resource/icon/user-icon.png"/> 登陆</a>
        <a href="#"><img src="./resource/icon/user-icon-2.png"/> 注册</a>
    </span>
  );
}


export default Navigation;
