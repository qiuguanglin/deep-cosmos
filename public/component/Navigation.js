import React from 'react';
import {Signout} from '../rest/UserRestful';
import {FormattedMessage} from 'react-intl';

const Navigation = ({
  onLanguageChanged, onSigninClick, onToggleInfoWindow,
  loginFlag, onSignoutStatus, displayingName, defaultLang})=>{
  const onSignoutClicked = ()=>{
    Signout((err, res) => onSignoutStatus(err ? true : !res.success));
  }

  return(
    <div id="navigation">
      {
        loginFlag ?
        (<span>
          <FormattedMessage id="navi-hello"/>
          <span className="hello">
           {displayingName}</span><a href="#" onClick={onSignoutClicked}><FormattedMessage id="navi-logout"/></a>
          </span>) :
        (<span>
          <a href="#" onClick={onSigninClick}>
            <img src="./resource/icon/user-icon.png"/>
            <FormattedMessage id="navi-account"/>
          </a>
        </span>)
      }

      <a href="#" onClick={onToggleInfoWindow} id="1">
        <img src="./resource/icon/info.png"/>
        <FormattedMessage id="navi-about"/>
      </a>

      <a href="#" onClick={onToggleInfoWindow} id="2">
        <img src="./resource/icon/phone.png"/>
        <FormattedMessage id="navi-contact"/>
      </a>

      <span>
        <select name="languages" onChange={onLanguageChanged} value={defaultLang}>
          <option value="zh">简体中文</option>
          <option value="en">English</option>
        </select>
      </span>

  </div>)
}

export default Navigation;
