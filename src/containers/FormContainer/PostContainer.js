import React, {useState} from 'react';
import styles from "./FormContainer.module.css";
import {loginUser, postProject, postProjectImage, uploadProfileImage} from "../../services/userApi";
import useUser from "../../componenets/UserComponent/UserComponent";
import TextInput from '../../componenets/InputFieldComponents/TextInput/TextInput'
import ActionButton from "../../componenets/ButtonComponents/ActionButton/ActionButton";
import CancelButton from "../../componenets/ButtonComponents/CancelButton/CancelButton";
import FileInput from "../../componenets/InputFieldComponents/FileInput/FileInput";

const FormContainer = ({ onCancel }) => {
    const currentUser = useUser();
    const [projectName, setProjectName] = useState('');
    const [projectArtist, setProjectArtist] = useState('');
    const [projectRelease, setProjectRelease] = useState('');
    const [projectCoverImage, setProjectCoverImage] = useState('');
    const [fileSelected, setFileSelected] = useState(false);


    const handleNameChange = (event) => {
        setProjectName(event.target.value);
    };
    const handleArtistChange = (event) => {
        setProjectArtist(event.target.value);
    };
    const handleReleaseChange = (event) => {
        setProjectRelease(event.target.value);
    };

    const handleFileChange = async (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            try {
                const formData = new FormData();
                formData.append('file', file);
                setProjectCoverImage(file); // Optionally, set the file state for display purposes
                setFileSelected(true);
                return formData;
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        } else {
            setFileSelected(false);
        }
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

        try {
            const formData = await handleFileChange(event);
            if (formData) {
                const response = await postProject(currentUser.userId, localStorage.getItem('token'), project);
                console.log("liedje:", response)
                // if(response){
                //     await postProjectImage(response.projectId, localStorage.getItem('token'), formData)
                //     window.location.reload();
                // }
            } else {
                console.error("No file selected");
            }

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
            <input type="file" onChange={handleFileChange}/>
            <br/>
            <ActionButton text="Add project" />
            <CancelButton className={"cancel"} text="Cancel" type="button" onClick={handleCancel}/>
        </form>
    );
};

export default FormContainer;
