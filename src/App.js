import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import "./styles/Global.css";
import "./styles/ThemeVariables.css";
import "./styles/Reset.css";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import MainNavComponent from "./componenets/NavComponents/MainNavComponent/MainNavComponent";
import RegisterContainer from "./containers/FormContainer/RegisterContainer";

function App() {
    const location = useLocation();
    const hideNav = location.pathname === "/";

    return (
        <>
            {!hideNav && <MainNavComponent />}
            <Routes>
                <Route path="/*" element={<AuthPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/project/:projectId" element={<ProjectPage />} />
            </Routes>
        </>
    );
}

export default App;
