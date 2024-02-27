import React, { useEffect, useRef, useState } from "react";
import { ImageComponent } from "../../componenets/PageComponents/ImageComponent/ImageComponent";
import header_dummy from "../../assets/header-img.jpeg";
import profile_dummy from "../../assets/profile-dummy.jpg";
import styles from "./ProfileContainer.module.css";
import useUser from "../../componenets/UserComponent/UserComponent";
import { getProfileImage, uploadProfileImage } from "../../services/userApi";

const ProfileContainer = () => {
    const currentUser = useUser();
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const fileInput = useRef(null);

    useEffect(() => {
        const fetchProfileImage = async () => {
            if (currentUser) {
                const imageData = await getProfileImage(currentUser.userId, localStorage.getItem('token'));
                if (imageData) {
                    const blob = new Blob([imageData], { type: 'image/jpeg' });
                    const url = URL.createObjectURL(blob);
                    setProfileImageUrl(url);
                } else {
                    setProfileImageUrl(profile_dummy);
                }
            }
        };

        fetchProfileImage();
    }, [currentUser]);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                const userId = 1;
                await uploadProfileImage(localStorage.getItem('token'), userId, formData);
                window.location.reload();
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    return (
        <>
            {currentUser ? (
                <div>
                    <div>
                        <ImageComponent
                            src={header_dummy}
                            alt="logo"
                            className="profile-header"
                        />
                    </div>
                    <div className={styles.information}>
                        <ImageComponent
                            src={profileImageUrl}
                            alt="profile image"
                            className="profile-image"
                            onChange={handleImageChange}
                            showEdit="true"
                        />
                        <h3>{currentUser.userFirstName} {currentUser.userLastName}</h3>
                        <p>{currentUser.jobDescription}</p>
                        <h6>Amsterdam, The Netherlands</h6>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default ProfileContainer;
