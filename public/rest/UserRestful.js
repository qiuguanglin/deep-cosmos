'use strict';

import {RestRequester, RemoteConfig} from '../global';

const {userRerouce} = RemoteConfig;

const NewUser = (username, password, nickname, callback) =>{
  RestRequester.post(`${userRerouce}/newUser`, {
    username,
    pass: password,
    nickname,
  }).then(res=>callback(null, res.data))
  .catch(err=>callback(err));
}

const AmIin = callback => {
  RestRequester.get(`${userRerouce}/amIin`)
  .then(res=>callback(null, res.data))
  .catch(err=>callback(err));
}

const Signout = callback => {
  RestRequester.get(`${userRerouce}/signout`)
  .then(res=>callback(null, res.data))
  .catch(err=>callback(err));
}

const LoginUser = (username, password, callback) =>{
  RestRequester.post(`${userRerouce}/login`, {
    username,
    pass: password,
  }).then(res=>callback(null, res.data))
  .catch(err=>callback(err));
}

const OAuthLogin = (type, callback) => {
  RestRequester.get(`${userRerouce}/oauth/${type}`).then(res=>callback(null, res.data));
}

export {NewUser, AmIin, Signout, LoginUser, OAuthLogin};
