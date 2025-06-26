import axios from '../api/axiosInstance'; 
import { AxiosError } from 'axios';

const log = async (id: string, action: string, details: string) => {
    try {
        await axios.post(`/api/audit/${id}`, { action, details });
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error logging message:", error.response?.data);
        } else {
            console.error("Unexpected error logging message:", error);
        }
    }
};

export default log;
