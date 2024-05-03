import React, {useState} from 'react';
import PasswordInput from '../../componenets/InputFieldComponents/PasswordInput/PasswordInput';
import EmailInput from '../../componenets/InputFieldComponents/EmailInput/EmailInput';
import styles from "./FormContainer.module.css";
import {CheckboxInput} from "../../componenets/InputFieldComponents/CheckboxInput/CheckboxInput";
import {LinkButton} from "../../componenets/ButtonComponents/LinkButton/LinkButton";
import { loginUser } from "../../services/api";
import { useAuth } from '../../context/AuthContext';
import {useNavigate} from "react-router-dom";
import {pem as jwt} from "node-forge";

const FormContainer = ({ onSubmit }) => {
    const navigate = useNavigate();
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

        try {
            const response = await loginUser(user);
            if (response) {
                console.log(response)
                localStorage.setItem('token', response.data.jwt);
                await login (response.data.jwt);
                navigate("/profile");

                const decodedToken = jwt.decode(response.data.jwt);
                console.log(decodedToken)
                const user_id = decodedToken.payload.sub;
                console.log(user_id)

            } else {
            }
        } catch (error) {
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
            <button>login</button>
            <div className={styles.auth_switch}><h6 >Don't have an account? </h6> <a href="/register"> Register </a> </div>
        </form>
    );
};

export default FormContainer;
