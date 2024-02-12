import React from "react";
import styles from "./MainNavComponent.module.css";
import logo from "../../../assets/soundwwise-logo.png";
import {useLocation, useNavigate} from "react-router-dom";
import {ImageComponent} from "../../PageComponents/ImageComponent/ImageComponent";
import SubmitButton from "../../ButtonComponents/SubmitButton/SubmitButton";
import {useAuth} from "../../../context/AuthContext";

export default function MainNavComponent() {
    const { logout } = useAuth();
    const location = useLocation();
    const pathname = location.pathname;

    const getPageName = () => {
        return pathname.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, ' ');
    }

    const handleLogout = async () => {
        await logout();
    };

    return (
        <>
            <nav className="upper-nav-back">
                    <h3>{getPageName()}</h3>
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