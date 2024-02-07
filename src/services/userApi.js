import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Replace with your backend URL

export const loginUser = async (user) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, user);
        const authToken = response.data.token;
        localStorage.setItem("authToken", authToken);
        return response;

    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};