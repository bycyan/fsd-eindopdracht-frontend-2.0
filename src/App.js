import { Route, Routes, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import "./styles/Global.css";
import "./styles/ThemeVariables.css";
import "./styles/Reset.css";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MainNavComponent from "./componenets/NavComponents/MainNavComponent/MainNavComponent";

function App() {
    const location = useLocation(); // Get the current location object
    const hideNav = location.pathname === "/";

  return (
    <>
        {!hideNav && <MainNavComponent />}
      <Routes>
          <Route path="/*" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;