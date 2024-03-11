import React, {useEffect, useState} from 'react';
import PasswordInput from '../../componenets/InputFieldComponents/PasswordInput/PasswordInput';
import EmailInput from '../../componenets/InputFieldComponents/EmailInput/EmailInput';
import SubmitButton from '../../componenets/ButtonComponents/SubmitButton/SubmitButton';
import styles from "./FormContainer.module.css";
import {CheckboxInput} from "../../componenets/InputFieldComponents/CheckboxInput/CheckboxInput";
import {LinkButton} from "../../componenets/ButtonComponents/LinkButton/LinkButton";
import {
    getAllUsers,
    loginUser,
    postProject,
    postSong,
    postSongFile,
    putContributorsToProject
} from "../../services/userApi";
import { useAuth } from '../../context/AuthContext';
import useUser from "../../componenets/UserComponent/UserComponent";
import TextInput from '../../componenets/InputFieldComponents/TextInput/TextInput'
import ActionButton from "../../componenets/ButtonComponents/ActionButton/ActionButton";
import CancelButton from "../../componenets/ButtonComponents/CancelButton/CancelButton";
import FileInput from "../../componenets/InputFieldComponents/FileInput/FileInput";

const PostContributorContainer = ({ project, onCancel }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    console.log(project)

    const handleNameChange = async (event) => {
        const searchText = event.target.value;
        setSearchTerm(searchText);
        setLoading(true);
        try {
            const response = await getAllUsers(localStorage.getItem('token'), searchText);
            console.log("Response Data:", response);
            if (response) {
                const filteredData = response.filter(user =>
                    user.userFirstName.toLowerCase().includes(searchText.toLowerCase()) ||
                    user.userLastName.toLowerCase().includes(searchText.toLowerCase()) ||
                    `${user.userFirstName} ${user.userLastName}`.toLowerCase().includes(searchText.toLowerCase()) ||
                    `${user.userLastName} ${user.userFirstName}`.toLowerCase().includes(searchText.toLowerCase())
                );
                setSearchResults(filteredData);
                console.log("Filter: ", filteredData)
            } else {
                console.error("Error: Response data is undefined");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    console.log("search Result: ", searchResults)

    const handleCancel = () => {
        onCancel();
    };

    const handleSelectUser = (userId) => {
        setSelectedUserId(userId);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedUserId) {
            try {
                const formData = new FormData();
                formData.append('projectName', project.projectName);
                console.log("data", formData)

                await putContributorsToProject(project.projectId, selectedUserId, formData);
            } catch (error) {
                console.error("Error adding user to project:", error);
            }
        }
    };

    return (
        <form className={styles.postForm} onSubmit={handleSubmit}>
            <h1>Add Contributor</h1>
            <TextInput onChange={handleNameChange} value={searchTerm} placeholder={"Search for contributor.."}/>
            {searchResults.length > 0 && (
                <div className={styles.selectDropdown}>
                    {searchResults.map(user => (
                        <div key={user.userId} className={styles.selectOption} onClick={() => handleSelectUser(user.userId)}>{user.userFirstName} {user.userLastName}</div>
                    ))}
                </div>
            )}
            <ActionButton text="Add" />
            <CancelButton className={"cancel"} text="Cancel" type="button" onClick={handleCancel}/>
        </form>
    );
};

export default PostContributorContainer;
