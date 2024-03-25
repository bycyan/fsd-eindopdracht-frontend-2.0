import React, {useState} from 'react';
import FormContainer from '../../containers/FormContainer/FormContainer';
import {useLocation} from "react-router-dom";
import TextInput from "../../componenets/InputFieldComponents/TextInput/TextInput";
import RegisterContainer from "../../containers/FormContainer/RegisterContainer";


export default function RegisterPage(){
    const [registered, setRegister] = useState(false);

    const handleRegister = () => {
        setRegister(true);
    };

    return (
        <main>
            <RegisterContainer onSubmit={handleRegister}/>
        </main>
    );
}