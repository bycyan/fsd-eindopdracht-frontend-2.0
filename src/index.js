import React from 'react';
import { createRoot } from 'react-dom'; // Importing createRoot from react-dom
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing BrowserRouter from react-router-dom
import AuthContextProvider from "./context/AuthContext";
import App from './App';

createRoot(document.getElementById("root")).render(
    <Router>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </Router>
);