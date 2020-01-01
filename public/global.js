'use strict';

import axios from 'axios';
const RestRequester = axios.create({
  withCredentials: true
});

const RemoteConfig = {
  host: 'http://localhost',
  port: 60000,
  get baseUrl() {return `${this.host}:${this.port}`},
  get userRerouce() {return this.baseUrl + '/user'}
}

export {RestRequester, RemoteConfig}
