import React from "react";
import styles from "./MainNavComponent.module.css";
import logo from "../../../assets/soundwwise-logo.png";
import {useLocation, useNavigate} from "react-router-dom";
import {ImageComponent} from "../../PageComponents/ImageComponent/ImageComponent";
import SubmitButton from "../../ButtonComponents/SubmitButton/SubmitButton";
import {useAuth} from "../../../context/AuthContext";
import useUser from "../../UserComponent/UserComponent";
import {LinkButton} from "../../ButtonComponents/LinkButton/LinkButton";

export default function MainNavComponent({ projectName }) {
    const currentUser = useUser();
    const { logout } = useAuth();
    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/")
    };

    const goToProfile = () => {
        navigate(`/profile`);
    };

    return (
        <>
            <nav className="upper-nav-back">

                {currentUser &&
                    <LinkButton className={"nav-profile-link"} text={"Hey, " + currentUser.userFirstName + " " + currentUser.userLastName} href="/profile" onClick={() => goToProfile()}/>
                }
                    <div className={styles.bttnGroup}>
                        <SubmitButton
                            text="Logout"
                            className="nav"
                            onClick={handleLogout}
                        />
                        <ImageComponent
                            src={logo}
                            alt="logo"
                            className="logo"
                        />
                    </div>
            </nav>
        </>
    );
}