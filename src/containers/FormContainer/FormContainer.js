import React, {useContext, useState} from 'react';
import PasswordInput from '../../componenets/InputFieldComponents/PasswordInput/PasswordInput';
import EmailInput from '../../componenets/InputFieldComponents/EmailInput/EmailInput';
import { SubmitButton } from '../../componenets/ButtonComponents/SubmitButton/SubmitButton';
import styles from "./FormContainer.module.css";
import {CheckboxInput} from "../../componenets/InputFieldComponents/CheckboxInput/CheckboxInput";
import {LinkButton} from "../../componenets/ButtonComponents/LinkButton/LinkButton";
import {getUser, loginUser} from "../../services/userApi";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {jwtDecode} from "jwt-decode";

const FormContainer = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

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

        try {
            const response = await loginUser(user);
            if (response) {
                const authToken = response.data.jwt;
                localStorage.setItem("token", authToken);

                //Decode JWT
                const decodedToken = jwtDecode(authToken);
                const userId = decodedToken.id;
                console.log("userId:", userId);
                console.log(response.data.jwt)

                const userData = await getUser(userId, response.data.jwt);
                // setUser(userData);

                console.log("userData: ", userData)
                console.log("auth: ", user)
                navigate("/profile")
            } else {
                // Handle unsuccessful login (e.g., display error message)
            }
        } catch (error) {
            // Handle API call errors
            console.error("Error:", error);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1>Login</h1>
            <EmailInput onChange={handleEmailChange} value={email}/>
            <PasswordInput onChange={handlePasswordChange} value={password} />
            <div className={styles.auth_opt}>
                <CheckboxInput text="Remember me" />
                <LinkButton text="Forgot Password?" href="#"/>
            </div>
            <SubmitButton text="Login" />
            <div className={styles.auth_switch}><h6 >Don't have an account? </h6> <LinkButton text="Register" href="/register/*"/></div>
        </form>
    );
};

export default FormContainer;
