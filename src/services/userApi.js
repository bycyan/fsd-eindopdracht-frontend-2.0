import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const loginUser = async (user) => {
    console.log(user)
    try {
        return await axios.post(`${BASE_URL}/login`, user);
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};


export const getUser = async (userId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${userId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const getProfileImage = async (userId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/file/user_image/${userId}`, {
            headers: {
                Accept: "image/png, image/jpeg, image/*",
                Authorization: `Bearer ${token}`
            },
            responseType: 'arraybuffer'
        });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};


export const getProject = async (projectId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/project/${projectId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};