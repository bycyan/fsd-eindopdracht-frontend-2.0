import React, {createContext, useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import { jwtDecode, JwtDecodeOptions } from 'jwt-decode';
import {CheckTokenValidity} from "../helper/CheckTokenValidity";

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

function AuthContextProvider({children}) {
    const navigate = useNavigate();
    const [authData, setAuthData] = useState({
        isAuth: false,
        user: null,
        currentUser: null,
        status: "pending",
    });

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken && CheckTokenValidity(storedToken)) {
            void login(storedToken);
        } else {
            void logout();
        }

    }, []);

    // useEffect(() => {
    //     const storedToken = localStorage.getItem('token');
    //     if (storedToken && CheckTokenValidity(storedToken)) {
    //         // Check if the user is already authenticated
    //         if (!authData.isAuth) {
    //             console.log('User is already logged in.');
    //             void login(storedToken);
    //         } else {
    //             console.log('User is already logged in. No need to login again.');
    //             setAuthData(prevAuthData => ({
    //                 ...prevAuthData,
    //                 status: 'done',
    //             }));
    //         }
    //     } else {
    //         console.log('User is not logged in.');
    //         void logout();
    //     }
    // }, []);

    function login(jwt_token) {
        const decodedToken = jwtDecode(jwt_token);
        const { sub, id, authorities } = decodedToken;

        try {
            setAuthData(prevAuthData => ({
                ...prevAuthData,
                isAuth: true,
                user: {
                    email: sub,
                    id: id,
                    authorities: authorities,
                },
                status: "done",
            }));
            // navigate("/profile");

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    function logout() {
        localStorage.removeItem('token');
        setAuthData(prevAuthData => ({
            ...prevAuthData,
            isAuth: false,
            user: null,
            status: "done",
        }));
        navigate("/");
    }


    const data = {
        isAuth: authData.isAuth,
        user: authData.user,
        login: login,
        logout: logout
    }



    return (
        <AuthContext.Provider value={data}>
            {authData.status === "done"? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;