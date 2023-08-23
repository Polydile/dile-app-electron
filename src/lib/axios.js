import Axios from 'axios';

let backendUrl = 'http://localhost';

export const axiosCreator = (token = null) => {
  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  };
  if(token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return Axios.create({
    baseURL: backendUrl,
    headers
  });
};