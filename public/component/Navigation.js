import React from 'react';
import {Signout} from '../rest/UserRestful';
import {FormattedMessage} from 'react-intl';

const Navigation = ({onLanguageChanged, onSigninClick, onToggleInfoWindow, loginFlag, onSignoutStatus, displayingName})=>{
  const onSignoutClicked = ()=>{
    Signout((err, res) => onSignoutStatus(err ? true : !res.success));
  }

  return(
    <div id="navigation">
      {
        loginFlag ?
        (<span>
          <span className="hello">
            <FormattedMessage id="navi-hello"/>
           {displayingName}</span><a href="#" onClick={onSignoutClicked}><FormattedMessage id="navi-logout"/></a>
          </span>) :
        (<span>
          <a href="#" onClick={onSigninClick}><img src="./resource/icon/user-icon.png"/> <FormattedMessage id="navi-account"/></a>
        </span>)
      }

      <a href="#" onClick={onToggleInfoWindow} id="1"><FormattedMessage id="navi-about"/></a>

      <a href="#" onClick={onToggleInfoWindow} id="2"><FormattedMessage id="navi-contact"/></a>

      <span>
        <select name="languages" onChange={onLanguageChanged}>
          <option value="zh">简体中文</option>
          <option value="en">English</option>
        </select>
      </span>

  </div>)
}

export default Navigation;
