'use strict';

import {RestRequester, RemoteConfig} from '../global';

const {searchResource} = RemoteConfig;

const FlightList = (from, to, callback) =>{
  RestRequester.get(`${searchResource}/flights/${from}/${to}`)
  .then(res=>callback(null, res.data))
  .catch(err=>callback(err));
}

export {FlightList};
