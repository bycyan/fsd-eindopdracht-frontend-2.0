import React, {useState} from 'react';
import FormContainer from '../../containers/FormContainer/FormContainer';
import {ImageComponent} from "../../componenets/PageComponents/ImageComponent/ImageComponent";
import logo from "../../assets/soundwwise-logo.png"

export default function AuthPage(){
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    return (
        <main>
            <FormContainer onSubmit={handleLogin} />
        </main>
    );
}