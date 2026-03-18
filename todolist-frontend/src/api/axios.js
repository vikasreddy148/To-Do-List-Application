import axios from 'axios';

// The base URL relies on the Vite proxy configured in vite.config.js
const api = axios.create({
  baseURL: '/api',
});

// Intercept requests to add the Authorization header if a token exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept responses to handle global authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the server returns 401 Unauthorized, we might want to automatically logout
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // A small hack to redirect to login if not already there, 
      // but usually react-router's context manages this better.
      if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
