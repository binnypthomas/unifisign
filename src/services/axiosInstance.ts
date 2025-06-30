// axiosInstance.ts
import axios from 'axios';
import { getCSRFToken } from '../hooks/useCSRFToken';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const csrfToken = getCSRFToken();
  //console.log('[AXIOS DEBUG] method=', config.method, 'url=', config.url);
  //console.log('[AXIOS DEBUG] cookie csrf_token=', csrfToken);
  const unsafeMethods = ['post', 'put', 'delete'];

  if (csrfToken && config.method && unsafeMethods.includes(config.method.toLowerCase())) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }

  //console.log('[AXIOS DEBUG] set X-CSRF-Token header:', config.headers['X-CSRF-Token']);
  return config;
});

export default api;
