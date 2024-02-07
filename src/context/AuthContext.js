import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import { jwtDecode, JwtDecodeOptions } from 'jwt-decode';
import {CheckTokenValidity} from "../helper/CheckTokenValidity";

export const AuthContext = createContext(null);


function AuthContextProvider({children}) {

    const [authData, setAuthData] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken && CheckTokenValidity(storedToken)) {
            void login(storedToken);
        } else {
            void logout();
        }

    }, []);


    function login(jwt_token, redirect) {

        const decodedToken = jwtDecode(jwt_token);
        const {sub, id, authorities} = decodedToken;

        setAuthData({
            ...authData,
            isAuth: true,
            user: {
                email: sub,
                id: id,
                authorities: authorities,
            },
            status: "done",
        });


        localStorage.setItem('token', jwt_token);

        console.log("Gebruiker is ingelogd!");
        if (redirect) navigate(redirect);
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