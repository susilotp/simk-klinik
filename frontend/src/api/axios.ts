import axios from 'axios';
// Gunakan kata kunci 'import type' khusus untuk AxiosInstance dan InternalAxiosRequestConfig
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// 1. Membuat instance axios dengan mengambil URL dari file .env via import.meta.env
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 2. Request Interceptor untuk menyisipkan Bearer Token sebelum request dikirim
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor untuk penanganan error global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;
