'use strict';

import {RestRequester, RemoteConfig} from '../global';

const {userRerouce} = RemoteConfig;

const NewUser = (username, password, nickname, csrfToken, callback) =>{
  RestRequester.post(`${userRerouce}/newUser`, {
    username,
    pass: password,
    nickname,
    _csrf: csrfToken
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

const LoginUser = (username, password, csrfToken, callback) =>{
  RestRequester.post(`${userRerouce}/login`, {
    username,
    pass: password,
    _csrf: csrfToken
  }).then(res=>callback(null, res.data))
  .catch(err=>callback(err));
}

export {NewUser, AmIin, Signout, LoginUser};
