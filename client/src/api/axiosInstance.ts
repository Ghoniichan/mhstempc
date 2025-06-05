// src/api/axiosInstance.ts
import axios from "axios";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL!;
const instance = axios.create({ baseURL });
export default instance;
