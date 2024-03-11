import React, {useState} from 'react';
import PasswordInput from '../../componenets/InputFieldComponents/PasswordInput/PasswordInput';
import EmailInput from '../../componenets/InputFieldComponents/EmailInput/EmailInput';
import SubmitButton from '../../componenets/ButtonComponents/SubmitButton/SubmitButton';
import styles from "./FormContainer.module.css";
import {CheckboxInput} from "../../componenets/InputFieldComponents/CheckboxInput/CheckboxInput";
import {LinkButton} from "../../componenets/ButtonComponents/LinkButton/LinkButton";
import { loginUser, postProject, postSong, postSongFile } from "../../services/userApi";
import { useAuth } from '../../context/AuthContext';
import useUser from "../../componenets/UserComponent/UserComponent";
import TextInput from '../../componenets/InputFieldComponents/TextInput/TextInput'
import ActionButton from "../../componenets/ButtonComponents/ActionButton/ActionButton";
import CancelButton from "../../componenets/ButtonComponents/CancelButton/CancelButton";
import FileInput from "../../componenets/InputFieldComponents/FileInput/FileInput";

const PostSongContainer = ({ projectId, onCancel }) => {
    const currentUser = useUser();
    const [songName, setSongName] = useState('');
    const [songFile, setSongFile] = useState(null); // Initialize songFile state with null
    const handleNameChange = (event) => {
        setSongName(event.target.value);
    };

    const handleFileChange = (file) => {
        setSongFile(file);
    };

    const handleCancel = () => {
        onCancel();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const song = {
            songName: songName,
        };

        try {
            const response = await postSong(projectId, localStorage.getItem('token'), song);
            if (response) {
                const formData = new FormData();
                console.log(formData)
                formData.append('file', songFile);
                await postSongFile(response.songId, localStorage.getItem('token'), formData);
            }
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form className={styles.postForm} onSubmit={handleSubmit}>
            <h1>Add Song</h1>
            <TextInput onChange={handleNameChange} value={songName} placeholder={"Song name"}/>
            <FileInput onChange={handleFileChange} />
            <br/>
            <ActionButton text="Add song" />
            <CancelButton className={"cancel"} text="Cancel" type="button" onClick={handleCancel}/>
        </form>
    );
};

export default PostSongContainer;
