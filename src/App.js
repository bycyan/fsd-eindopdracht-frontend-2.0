import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import "./styles/Global.css";
import "./styles/ThemeVariables.css";
import "./styles/Reset.css";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  return (
    <>
      <Routes>
          <Route path="/*" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
