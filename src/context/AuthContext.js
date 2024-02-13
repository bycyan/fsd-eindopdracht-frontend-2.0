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
            console.log("ingelogd")
            void login(storedToken);
        } else {
            console.log("uitgelogd")
            void logout();
        }

    }, []);

    function login(jwt_token) {
        console.log("Login is aangeroepen");
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
            navigate("/Profile");

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
        // navigate("/");
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