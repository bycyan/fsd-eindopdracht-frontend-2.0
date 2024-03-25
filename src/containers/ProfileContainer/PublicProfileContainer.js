import React, { useEffect, useRef, useState } from "react";
import { ImageComponent } from "../../componenets/PageComponents/ImageComponent/ImageComponent";
import header_dummy from "../../assets/header-img.jpeg";
import profile_dummy from "../../assets/profile-dummy.jpg";
import styles from "./ProfileContainer.module.css";
import {getProfileImage, getUser, uploadProfileImage} from "../../services/userApi";
import {useParams} from "react-router-dom";

const ProfileContainer = ( ) => {
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [publicUser, setCurrentUser] = useState(null);
    const id = useParams();
    const { userId } = useParams();

    console.log(id)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUser(id.userId, localStorage.getItem('token'));
                setCurrentUser(userData);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchProfileImage = async () => {
            if (publicUser) {
                const imageData = await getProfileImage(publicUser.userId, localStorage.getItem('token'));
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
    }, [publicUser]);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                const userId = publicUser.userId;
                await uploadProfileImage(localStorage.getItem('token'), userId, formData);
                window.location.reload();
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    return (
        <main>
            <section>
            {publicUser ? (
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
                        <h3>{publicUser.userFirstName} {publicUser.userLastName}</h3>
                        <p>{publicUser.jobDescription}</p>
                        <h6>Amsterdam, The Netherlands</h6>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            </section>
        </main>
    );
};

export default ProfileContainer;
