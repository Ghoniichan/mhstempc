import axios from './axiosInstance';

export const idFromLoanId = async (loanNo: string) => {
    try {
        const response = await axios.get('/api/accid/loanid', { params: { loanId: loanNo } });
        return response.data;
    } catch (error) {
        console.error("Error fetching account ID from loan ID:", error);
        throw error;
    }
}