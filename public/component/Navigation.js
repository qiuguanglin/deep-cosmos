import React from 'react';
import {Signout} from '../rest/UserRestful';

const Navigation = ({onLanguageChanged, onSigninClick, loginFlag, onSignoutStatus})=>{
  const onSignoutClicked = ()=>{
    Signout((err, res) => onSignoutStatus(err ? true : !res.success));
  }

  return(
    <div id="navigation">
      {
        loginFlag ?
        (<span>
          <a href="#" onClick={onSignoutClicked}>退出</a>
        </span>) :
        (<span>
          <a href="#" onClick={onSigninClick}><img src="./resource/icon/user-icon.png"/> 我的账户</a>
        </span>)
      }
      <span>
        <label>语言  </label>
        <select name="languages" onChange={onLanguageChanged}>
          <option value="ch">简体中文</option>
          <option value="en">英文</option>
        </select>
      </span>
  </div>)
}

export default Navigation;
