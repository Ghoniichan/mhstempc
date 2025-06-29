import axios from './axiosInstance';

export const sendNotification = async (
    receiver: string | string[],
    sender: string,
    message: string,
    subject: string
) => {
    try {
        const data = {
            receiver,
            message,
            subject,
        };
        console.log("Sending notification with data:", data);
        const response = await axios.post(`/api/notifications/send/${sender}`, data);
        return response.data;
    } catch (error) {
        console.error("Error sending notification:", error);
        throw error;
    }
};