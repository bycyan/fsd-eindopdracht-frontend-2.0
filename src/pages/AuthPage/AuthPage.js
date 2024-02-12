import React, {useState} from 'react';
import FormContainer from '../../containers/FormContainer/FormContainer';
import {ImageComponent} from "../../componenets/PageComponents/ImageComponent/ImageComponent";
import logo from "../../assets/soundwwise-logo.png"
import ProfilePage from "../ProfilePage/ProfilePage";

export default function AuthPage(){
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    return (
        <main>
            <ImageComponent
                src={logo}
                alt="logo"
                className="logo"
            />
            <div>
            {loggedIn ? (
                <ProfilePage />
            ) : (
                <FormContainer onSubmit={handleLogin} />
            )}
            </div>
        </main>
    );
}