import React, {useState} from 'react';
import PasswordInput from '../../componenets/InputFieldComponents/PasswordInput/PasswordInput';
import EmailInput from '../../componenets/InputFieldComponents/EmailInput/EmailInput';
import SubmitButton from '../../componenets/ButtonComponents/SubmitButton/SubmitButton';
import styles from "./FormContainer.module.css";
import {CheckboxInput} from "../../componenets/InputFieldComponents/CheckboxInput/CheckboxInput";
import {LinkButton} from "../../componenets/ButtonComponents/LinkButton/LinkButton";
import {loginUser, registerUser} from "../../services/userApi";
import { useAuth } from '../../context/AuthContext';
import {useNavigate} from "react-router-dom";
import TextInput from "../../componenets/InputFieldComponents/TextInput/TextInput";

const RegisterContainer = ({ onSubmit }) => {
    const navigate = useNavigate();
    // const { login } = useAuth();
    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const [userFirstName, setFirstName] = useState('');
    const [userLastName, setLastName] = useState('');
    const [jobDescription, setJobDescription] = useState('Music Professional');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            userFirstName: userFirstName,
            userLastName: userLastName,
            userEmail: userEmail,
            userPassword: userPassword,
            jobDescription: jobDescription
        };

        try {
            const response = await registerUser(user);
            if (response){
                navigate("/");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1>Register</h1>
            <TextInput onChange={handleFirstNameChange} value={userFirstName} placeholder={"First name"}/>
            <TextInput onChange={handleLastNameChange} value={userLastName} placeholder={"Last name"}/>
            <EmailInput onChange={handleEmailChange} value={userEmail}/>
            <PasswordInput onChange={handlePasswordChange} value={userPassword} />
            <button>Register</button>
            <div className={styles.auth_switch}><h6 >Already have an account? </h6> <LinkButton text="Login" href="/register/*"/></div>
        </form>
    );
};

export default RegisterContainer;
