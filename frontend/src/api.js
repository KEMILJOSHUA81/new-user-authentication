// src/api.js
import axios from 'axios';

const API = axios.create({
  // Make sure this matches your backend server. If backend is running on port 5000:
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  // you can add other defaults here (timeout, headers, etc.)
});

// Attach token automatically from localStorage to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
