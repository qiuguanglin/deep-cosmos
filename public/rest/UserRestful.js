'use strict';
import axios from 'axios';

const [HOST, PORT] = ['http://localhost', 60000];
const Requester = axios.create({
  withCredentials: true
});

const NewUser = (username, password, callback) =>{
  Requester.post(`${HOST}:${PORT}/user/newUser`, {
    username,
    password
  }).then(res=>callback(null, res.data))
  .catch(err=>callback(err));
}

const AmIin = callback => {
  Requester.get(`${HOST}:${PORT}/user/amIin`)
  .then(res=>callback(null, res.data))
  .catch(err=>callback(err));
}

const Signout = callback => {
  Requester.delete(`${HOST}:${PORT}/user/signout`)
  .then(res=>callback(null, res.data))
  .catch(err=>callback(err));
}

export {NewUser, AmIin, Signout};
