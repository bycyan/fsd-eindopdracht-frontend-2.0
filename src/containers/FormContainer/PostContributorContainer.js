import React, {useState} from 'react';
import styles from "./FormContainer.module.css";
import {getAllUsers, putContributorsToProject} from "../../services/userApi";
import TextInput from '../../componenets/InputFieldComponents/TextInput/TextInput'
import ActionButton from "../../componenets/ButtonComponents/ActionButton/ActionButton";
import CancelButton from "../../componenets/ButtonComponents/CancelButton/CancelButton";

const PostContributorContainer = ({ project, onCancel }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [placeholderText, setPlaceholderText] = useState("Search for contributor.."); // Initialize placeholder text state
    const handleNameChange = async (event) => {
        const searchText = event.target.value;
        setSearchTerm(searchText);
        setLoading(true);
        try {
            const response = await getAllUsers(localStorage.getItem('token'), searchText);
            if (response) {
                const filteredData = response.filter(user =>
                    user.userFirstName.toLowerCase().includes(searchText.toLowerCase()) ||
                    user.userLastName.toLowerCase().includes(searchText.toLowerCase()) ||
                    `${user.userFirstName} ${user.userLastName}`.toLowerCase().includes(searchText.toLowerCase()) ||
                    `${user.userLastName} ${user.userFirstName}`.toLowerCase().includes(searchText.toLowerCase())
                );
                setSearchResults(filteredData);
            } else {
                console.error("Error: Response data is undefined");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleCancel = () => {
        onCancel();
    };
    const handleSelectUser = (userId) => {
        setSelectedUserId(userId);
        const selectedUser = searchResults.find(user => user.userId === userId);
        if (selectedUser) {
            setPlaceholderText(`${selectedUser.userFirstName} ${selectedUser.userLastName}`);
            setSearchTerm(""); // Reset searchTerm to empty string when a user is selected
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedUserId) {
            try {
                const formData = new FormData();
                formData.append('projectData', JSON.stringify(project)); // Stringify project object and append it to FormData
                const data = [project]
                const token = localStorage.getItem('token');
                await putContributorsToProject(project.projectId, selectedUserId, token, data);
                window.location.reload();
            } catch (error) {
                console.error("Error adding user to project:", error);
            }
        }
    };

    return (
        <form className={styles.postForm} onSubmit={handleSubmit}>
            <h1>Add Contributor</h1>
            <TextInput onChange={handleNameChange} value={searchTerm} placeholder={placeholderText}/>
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
