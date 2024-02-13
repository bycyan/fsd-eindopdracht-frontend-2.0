import React, {useState} from 'react';
import PasswordInput from '../../componenets/InputFieldComponents/PasswordInput/PasswordInput';
import EmailInput from '../../componenets/InputFieldComponents/EmailInput/EmailInput';
import SubmitButton from '../../componenets/ButtonComponents/SubmitButton/SubmitButton';
import styles from "./FormContainer.module.css";
import {CheckboxInput} from "../../componenets/InputFieldComponents/CheckboxInput/CheckboxInput";
import {LinkButton} from "../../componenets/ButtonComponents/LinkButton/LinkButton";
import { loginUser } from "../../services/userApi";
import { useAuth } from '../../context/AuthContext';

const FormContainer = ({ onSubmit }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            authEmail: email,
            authPassword: password
        };

        console.log(user)
        const response = await loginUser(user);
        console.log("response after login: ", response)
        localStorage.setItem('token', response.data.jwt);

        try {
            const response = await loginUser(user);
            console.log(response)
            if (response) {
                localStorage.setItem('token', response.data.jwt);
                await login (response.data.jwt);
            } else {
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // const handleLogin = async () => {
    //     await handleSubmit();
    // }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1>Login</h1>
            <EmailInput onChange={handleEmailChange} value={email}/>
            <PasswordInput onChange={handlePasswordChange} value={password} />
            <div className={styles.auth_opt}>
                <CheckboxInput text="Remember me" />
                <LinkButton text="Forgot Password?" href="#"/>
            </div>
            <button>login</button>
            {/*<SubmitButton text="Login" onClick={handleLogin}/>*/}
            <div className={styles.auth_switch}><h6 >Don't have an account? </h6> <LinkButton text="Register" href="/register/*"/></div>
        </form>
    );
};

export default FormContainer;
