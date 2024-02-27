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

export async function uploadProfileImage(token, userId, formData) {
    const response = await axios.post(`${BASE_URL}/file/user_image/${userId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}


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

export async function postProject(userId, token, projectData) {
    try {
        const response = await axios.post(`${BASE_URL}/project/${userId}`, projectData,{
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
}

export const getSongs = async (projectId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/song/${projectId}/songs`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        // console.log("liedjes: ", response)
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const getSong = async (songId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/file/song/${songId}`, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });
        console.log("liedje: ", response)
        return response;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const getContributors = async (projectId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/project/${projectId}`, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });
        console.log("liedje: ", response)
        return response;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};