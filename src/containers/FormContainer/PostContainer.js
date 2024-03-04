import React, {useState} from 'react';
import PasswordInput from '../../componenets/InputFieldComponents/PasswordInput/PasswordInput';
import EmailInput from '../../componenets/InputFieldComponents/EmailInput/EmailInput';
import SubmitButton from '../../componenets/ButtonComponents/SubmitButton/SubmitButton';
import styles from "./FormContainer.module.css";
import {CheckboxInput} from "../../componenets/InputFieldComponents/CheckboxInput/CheckboxInput";
import {LinkButton} from "../../componenets/ButtonComponents/LinkButton/LinkButton";
import {loginUser, postProject} from "../../services/userApi";
import { useAuth } from '../../context/AuthContext';
import useUser from "../../componenets/UserComponent/UserComponent";
import TextInput from '../../componenets/InputFieldComponents/TextInput/TextInput'
import ActionButton from "../../componenets/ButtonComponents/ActionButton/ActionButton";
import CancelButton from "../../componenets/ButtonComponents/CancelButton/CancelButton";

const FormContainer = ({ onCancel }) => {
    const currentUser = useUser();
    const [projectName, setProjectName] = useState('');
    const [projectArtist, setProjectArtist] = useState('');
    const [projectRelease, setProjectRelease] = useState('');

    const handleNameChange = (event) => {
        setProjectName(event.target.value);
    };
    const handleArtistChange = (event) => {
        setProjectArtist(event.target.value);
    };
    const handleReleaseChange = (event) => {
        setProjectRelease(event.target.value);
    };

    const handleCancel = () => {
        onCancel();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const project = {
            projectName: projectName,
            projectArtist: projectArtist,
            projectRelease: projectRelease
        };

        console.log("submit aangeroepen")

        console.log(project)
        console.log(currentUser.userId, localStorage.getItem('token'))
        try {
            const response = await postProject(currentUser.userId, localStorage.getItem('token'), project);
            console.log(response)
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form className={styles.postForm} onSubmit={handleSubmit}>
            <h1>New Project</h1>
            <TextInput onChange={handleNameChange} value={projectName} placeholder={"Project name"}/>
            <TextInput onChange={handleArtistChange} value={projectArtist} placeholder={"Project artist"} />
            <TextInput onChange={handleReleaseChange} value={projectRelease} placeholder={"Project release"}/>
            <br/>
            <ActionButton text="Add project" />
            <CancelButton className={"cancel"} text="Cancel" type="button" onClick={handleCancel}/>
        </form>
    );
};

export default FormContainer;
