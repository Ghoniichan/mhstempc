// src/api/axiosInstance.ts
import axios, { InternalAxiosRequestConfig } from "axios";
//import.meta.env.VITE_APP_API_BASE_URL ||
const baseURL =  "http://localhost:9000";
const instance = axios.create({ baseURL });

// 1. Add a request interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 2. Grab the token from wherever you're storing it (e.g., localStorage)
    const token = localStorage.getItem("token");

    // 3. If it exists, set Authorization header
    if (token) {
      // Ensure headers object exists
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // If something goes wrong when setting up the request, reject
    return Promise.reject(error);
  }
);

export default instance;