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

export const registerUser = async (user) => {
    // console.log(user)
    try {
        return await axios.post(`${BASE_URL}/user/register`, user);
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

export const getPublicUser = async (userId, token) => {
    console.log(userId, token)
    try {
        const response = await axios.get(`${BASE_URL}user/public/${userId}`, {
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



export const getAllUsers = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/users`, {
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

export async function postProjectImage(projectId, token, formData) {
    const response = await axios.post(`${BASE_URL}/file/project_image/${projectId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}


export const getProjectImage = async (projectId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/file/project_image/${projectId}`, {
            headers: {
                Accept: "image/png, image/jpeg, image/*",
                Authorization: `Bearer ${token}`
            },
            responseType: 'arraybuffer'
        });
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const getSongs = async (projectId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/song/${projectId}/songs`, {
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

export const getSongFile = async (songId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/file/song/${songId}`, {
            responseType: "arraybuffer",
            headers: {
                Accept: "audio/mp3",
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });
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
        return response;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const putContributorsToProject = async (projectId, userId, token, formData) => {
    console.log("api ids: ", projectId, userId)
    console.log("project: ", formData)
    console.log("token: ", token)
    try {
        const projectData = formData[0];
        return await axios.put(`${BASE_URL}/project/contributor/${projectId}/${userId}`, projectData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export async function postSong(projectId, token, songData) {
    try {
        const response = await axios.post(`${BASE_URL}/song/${projectId}`, songData,{
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

export async function postSongFile(songId, token, songData) {
    try {
        const response = await axios.post(`${BASE_URL}/file/song/${songId}`, songData, {
            headers: {
                Accept: "audio/mp3",
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
            responseType: 'arraybuffer'
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}


