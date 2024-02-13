import React from 'react';
import styles from "./ImageComponent.module.css"
import {uploadProfileImage} from "../../../services/userApi";

export class ImageComponent extends React.Component {
    handleImageClick = () => {
        this.fileInput.click();
    }

    handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                // Call the API function to upload the image
                const userId = 1; // Replace with actual user ID
                await uploadProfileImage(localStorage.getItem('token'), userId, formData);
                window.location.reload();
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    }


    render() {
        return (
            <>
                <img
                    src={this.props.src}
                    alt={this.props.alt}
                    className={styles[this.props.className]}
                    onClick={this.handleImageClick} // Attach click event handler
                />
                <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={input => this.fileInput = input} // Create a reference to the file input element
                    onChange={this.handleImageChange}
                />
            </>
        );
    }
}
