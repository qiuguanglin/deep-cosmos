import React from 'react';
import {Signout} from '../rest/UserRestful';
import {FormattedMessage} from 'react-intl';
import '../css/navigation.css';
import userIcon from '../resource/icon/user-icon.png';
import infoIcon from '../resource/icon/info.png';
import phoneIcon from '../resource/icon/phone.png';

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
            <img src={userIcon}/>
            <FormattedMessage id="navi-account"/>
          </a>
        </span>)
      }

      <a href="#" onClick={onToggleInfoWindow} id="1">
        <img src={infoIcon}/>
        <FormattedMessage id="navi-about"/>
      </a>

      <a href="#" onClick={onToggleInfoWindow} id="2">
        <img src={phoneIcon}/>
        <FormattedMessage id="navi-contact"/>
      </a>

      <span>
        <select name="languages" onChange={onLanguageChanged} value={defaultLang}>
          <option value="zh">简体中文</option>
          <option value="en">English</option>
        </select>
      </span>

      <a href="https://github.com/qiuguanglin/deep-cosmos/wiki">
        <FormattedMessage id="navi-github"/>
      </a>
  </div>)
}

export default Navigation;
