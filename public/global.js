'use strict';

import axios from 'axios';
const RestRequester = axios.create({
  withCredentials: true
});

const RemoteConfig = {
  development: {
    host: 'http://localhost',
    port: 60000
  },
  production: {
    host: 'http://120.77.17.197',
    port: 60000
  },
  get baseUrl() {return `${this[process.env.NODE_ENV].host}:${this[process.env.NODE_ENV].port}`},
  get userRerouce() {return this.baseUrl + '/user'},
  get promotionResource() {return this.baseUrl + '/promotion'},
  get searchResource() {return this.baseUrl + '/search'},
  get dataResource() {return this.baseUrl + '/data'},
}

export {RestRequester, RemoteConfig}
