'use strict';

import {RestRequester, RemoteConfig} from '../global';

const {promotionResource} = RemoteConfig;

const PromotionList = callback =>{
  RestRequester.get(`${promotionResource}/promotionList`)
  .then(res=>callback(null, res.data))
  .catch(err=>callback(err));
}

export {PromotionList};
