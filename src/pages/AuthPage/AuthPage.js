//Container(s): FormContainer <Section>
//Component(s): TextInput, PasswordInput, EmailInput, SubmitButton
//Endpoints: /login /register /reset_password
//Redirects: /login > /profile, /register > /login autofilled, /reset_password > /login, succes message

import React, {useState} from 'react';
import FormContainer from '../../containers/FormContainer/FormContainer';
import {ImageComponent} from "../../componenets/PageComponents/ImageComponent/ImageComponent";
import logo from "../../assets/soundwwise-logo.png"
import ProfilePage from "../ProfilePage/ProfilePage";
import {Navigate, Route, Routes} from "react-router-dom";

export default function AuthPage(){
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        // Logic to authenticate user
        setLoggedIn(true);
    };

    return (
        <main>
            <ImageComponent
                src={logo}
                alt="logo"
                className="logo"
            />
            <section>
            {loggedIn ? (
                <ProfilePage />
            ) : (
                <FormContainer onSubmit={handleLogin} />
            )}
            </section>
        </main>
    );
}