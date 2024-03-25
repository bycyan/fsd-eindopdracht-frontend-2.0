import {getAllUsers} from "../../services/userApi";
import React, {useState} from "react";
import TextInput from "../../componenets/InputFieldComponents/TextInput/TextInput";
import styles from "../FormContainer/FormContainer.module.css";

const SearchContainer = ( ) => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [placeholderText, setPlaceholderText] = useState("Search for contributor..");
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
    }

    const handleSelectUser = (userId) => {
        setSelectedUserId(userId);
        const selectedUser = searchResults.find(user => user.userId === userId);
        if (selectedUser) {
            setPlaceholderText(`${selectedUser.userFirstName} ${selectedUser.userLastName}`);
            setSearchTerm(""); // Reset searchTerm to empty string when a user is selected
        }
    };

    return (<form>
    <TextInput onChange={handleNameChange} value={searchTerm} placeholder={placeholderText}/>
    {searchResults.length > 0 && (
        <div className={styles.selectDropdown}>
            {searchResults.map(user => (
                <div key={user.userId} className={styles.selectOption} onClick={() => handleSelectUser(user.userId)}>{user.userFirstName} {user.userLastName}</div>
            ))}
        </div>
    )}
    </form>
    );
};

export default SearchContainer;