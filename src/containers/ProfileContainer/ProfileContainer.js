import React, { useContext, useEffect, useState } from "react";
import { ImageComponent } from "../../componenets/PageComponents/ImageComponent/ImageComponent";
import header_dummy from "../../assets/header-img.jpeg";
import profile_img from "../../assets/profile-img.jpeg";
import styles from "./ProfileContainer.module.css";
import {useAuth} from "../../context/AuthContext";
import {getUser} from "../../services/userApi";

const ProfileContainer = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState(() => {
        // Retrieve user data from localStorage on component initialization
        const storedUserData = localStorage.getItem("userData");
        return storedUserData ? JSON.parse(storedUserData) : null;
    });
    console.log("UserId: ", user.id, localStorage.getItem('token'))

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const retrievedUser = await getUser(user.id, localStorage.getItem('token'));
                setUserData(retrievedUser);
                console.log('User data:', retrievedUser);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);
    // console.log("stored: ", userData.userFirstName)

    return (
        <>
            {userData ? ( // Render if userData is available
                <section>
                    <div>
                        <ImageComponent
                            src={header_dummy}
                            alt="logo"
                            className="profile-header"
                        />
                    </div>
                    <div className={styles.information}>
                        <ImageComponent
                            src={profile_img}
                            alt="profile image"
                            className="profile-image"
                        />
                        <h3>{userData.userFirstName} {userData.userLastName}</h3>
                        <p>{userData.jobDescription}</p>
                        <h5>{userData.userEmail}</h5>
                    </div>
                </section>
            ) : (
                <p>Loading...</p> // Render a loading message while userData is being fetched
            )}
        </>
    );
};

export default ProfileContainer;
