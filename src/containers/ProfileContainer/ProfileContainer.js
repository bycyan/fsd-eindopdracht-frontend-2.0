import React, { useContext, useEffect, useState } from "react";
import { ImageComponent } from "../../componenets/PageComponents/ImageComponent/ImageComponent";
import header_dummy from "../../assets/header-img.jpeg";
import styles from "./ProfileContainer.module.css";

const ProfileContainer = ({user}) => {


    return (
        <>
            <div>
                <ImageComponent
                    src={header_dummy}
                    alt="logo"
                    className="profile-header"
                />
            </div>
                <div className={styles.information}>
                    <ImageComponent
                        src=""
                        alt="profile image"
                        className="profile-image"
                    />
                    <h2></h2>
                    {/* Render additional user information as needed */}
                </div>
        </>
    );
};

export default ProfileContainer;
