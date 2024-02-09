import React, {createContext, useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import { jwtDecode, JwtDecodeOptions } from 'jwt-decode';
import {CheckTokenValidity} from "../helper/CheckTokenValidity";
import {getUser} from "../services/userApi";

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

function AuthContextProvider({children}) {
    const navigate = useNavigate();
    const [authData, setAuthData] = useState({
        isAuth: false,
        user: null,
        userData: null, // Add userData to the state
        status: "pending",
    });


    useEffect(() => {
        const storedToken = localStorage.getItem('Token');
        console.log("Is login of logout?");
        if (storedToken && CheckTokenValidity(storedToken)) {
            void login(storedToken);
            console.log("storedToken: ", storedToken)
        } else {
            void logout();
        }

    }, []);


    const login = async (jwt_token, redirect) => {
        console.log("Login is aangeroepen");
        const decodedToken = jwtDecode(jwt_token);
        const {sub, id, authorities} = decodedToken;

        try {
            // const userData = await getUser(id, jwt_token);
            setAuthData({
                ...authData,
                isAuth: true,
                user: {
                    email: sub,
                    id: id,
                    authorities: authorities,
                },
                // userData: userData,
                status: "done",
            });


            localStorage.setItem('Token', jwt_token);

            console.log("Gebruiker is ingelogd!");
            console.log(decodedToken.id);

            if (redirect) navigate(redirect);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    function logout() {
        localStorage.removeItem('token');
        console.log("Logout is aangeroepen");
        setAuthData({
            ...authData,
            isAuth: false,
            user: null,
            status: "done",
        })
        console.log("Gebruiker is uitgelogd!");
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