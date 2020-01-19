'use strict';

import {RestRequester, RemoteConfig} from '../global';
import Adapter from './adapter/SearchResultAggregater';

const {searchResource} = RemoteConfig;

const Search = (from, to, flightsMap, planetList, routeCostMap, callback) =>{
  RestRequester.get(`${searchResource}/flights/${from}/${to}`)
  .then(res => {
    if(!res.data.success)
      throw Error('error when searching routes', from, to, res.data.message);
    return res;
  })
  .then(res => Adapter(res, flightsMap, planetList, routeCostMap))
  .then(res => callback(null, res))
  .catch(err => callback(err));
}

export {Search};
