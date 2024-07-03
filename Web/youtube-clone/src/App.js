import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Feed from "./pages/Feed/Feed";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import VideoDisplay from "./components/WatchVid/VideoDisplay/VideoDisplay";
import AppContext from "./AppContext";
import { useEffect } from "react";
import UserPage from "./pages/UserPage/UserPage";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [videoList, setVideoList] = useState([]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(!darkMode);
    if (currentUser) {
      currentUser.settings.darkMode = !currentUser.settings.darkMode;
    }
    document.body.classList.toggle("dark-mode", newDarkMode);
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch(`api/tokens/${token}`);
          const data = await response.json();
          const { user } = data;
          if (user) {
            setCurrentUser(user);
            if (currentUser.settings.darkMode) {
              toggleDarkMode();
            }
          }
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    getCurrentUser();
  }, []);

  const contextValue = { currentUser, setCurrentUser, darkMode, toggleDarkMode, videoList, setVideoList };
  return (
    <AppContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Feed />} />
            <Route path="/users/:userId/videos/:videoId" element={<VideoDisplay />} />
            <Route path="/userpage" element={<UserPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
