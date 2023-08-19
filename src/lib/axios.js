import Axios from 'axios';

let backendUrl = 'http://localhost';

export const axios = Axios.create({
  baseURL: backendUrl,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json'
  },
  //withCredentials: true
});


