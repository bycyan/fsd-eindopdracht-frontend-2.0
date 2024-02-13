import React, { useEffect, useState } from "react";
import { ImageComponent } from "../../componenets/PageComponents/ImageComponent/ImageComponent";
import header_dummy from "../../assets/header-img.jpeg";
import profile_img from "../../assets/profile-img.jpeg";
import styles from "./ProfileContainer.module.css";
import useUser from "../../componenets/UserComponent/UserComponent";
import {getProfileImage} from "../../services/userApi";

const ProfileContainer = () => {
    const currentUser = useUser();
    const [profileImageUrl, setProfileImageUrl] = useState(null);

    useEffect(() => {
        const fetchProfileImage = async () => {
            if (currentUser) {
                const imageData = await getProfileImage(currentUser.userId, localStorage.getItem('token'));
                if (imageData) {
                    const blob = new Blob([imageData], { type: 'image/jpeg' });
                    const url = URL.createObjectURL(blob);
                    setProfileImageUrl(url);
                }
            }
        };

        fetchProfileImage();
    }, [currentUser]);

    console.log(profileImageUrl)
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
                        />
                        <h3>{currentUser.userFirstName} {currentUser.userLastName}</h3>
                        <p>{currentUser.jobDescription}</p>
                        <h6>Amsterdam, The Netherlands</h6>
                    </div>
                </div>
            ) : (
                <p>Loading...</p> // Render a loading message while userData is being fetched
            )}
        </>
    );
};

export default ProfileContainer;
