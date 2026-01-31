import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // backend base URL
});

// Add token automatically if stored
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // JWT stored after login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;