// src/api/axiosInstance.ts
import axios from "axios";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL || 'http://localhost:9000';
const instance = axios.create({ baseURL });
export default instance;
