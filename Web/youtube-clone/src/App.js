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
  // const [darkMode, setDarkMode] = useState(currentUser.settings.darkMode);
  const [videoList, setVideoList] = useState([]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle("dark-mode", newDarkMode);
  };

  const contextValue = { currentUser, setCurrentUser, darkMode, toggleDarkMode, videoList, setVideoList };

  useEffect(() => {
    const getCurrentUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch(`api/tokens/${token}`);
        const data = await response.json();
        if (data.user) {
          setCurrentUser(data.user);
        }
      }
    };
    getCurrentUser();
  }, []);

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
