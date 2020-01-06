'use strict';

import {RestRequester, RemoteConfig} from '../global';
const {dataResource} = RemoteConfig;

const Data = callback =>{
  RestRequester.get(`${dataResource}/flights`)
  .then(res=>callback(null, res.data))
  .catch(err=>callback(err));
}

export {Data};
