'use strict';

import {RestRequester, RemoteConfig} from '../global';

const {csrfToken} = RemoteConfig;

const CSRF = callback =>{
  RestRequester.get(csrfToken)
  .then(res=>callback(null, res.data))
  .catch(err=>callback(err));
}

export {CSRF};
