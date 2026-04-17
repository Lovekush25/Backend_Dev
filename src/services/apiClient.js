import axios from 'axios';
import { getToken, clearToken } from '../utils/storage';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000, // 🔥 important (10s timeout)
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ REQUEST INTERCEPTOR
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    // 🔥 AUTO LOGOUT ON TOKEN EXPIRE
    if (status === 401) {
      clearToken();

      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    // 🔥 SERVER DOWN / NETWORK ERROR HANDLE
    if (!error.response) {
      console.error('Network error / Server not reachable');
    }

    return Promise.reject(error);
  }
);

export default apiClient;