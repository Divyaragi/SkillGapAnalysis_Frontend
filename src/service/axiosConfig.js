import axios from 'axios';
import Cookies from 'js-cookie';
const token = Cookies.get('result')
const axiosInstance = axios.create({
  baseURL: 'http://localhost:1012/v0.1/',
  headers: {
    'Content-Type': 'application/json',
    'user_id': '1',
    'authorization': token?JSON.parse(Cookies.get('result')).accessToken:''
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized, redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
