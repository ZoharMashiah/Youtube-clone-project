import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Feed from "./pages/Feed/Feed";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import VideoDisplay from "./components/WatchVid/VideoDisplay/VideoDisplay";
import AppContext from "./AppContext";
import UserPage from "./pages/UserPage/UserPage";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const contextValue = { currentUser, setCurrentUser, darkMode, toggleDarkMode };

  return (
    <AppContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Feed />} />
            <Route path="/users/:userId/videos/:videoId" element={<VideoDisplay />} />
            {/* <Route path="/" element={<UserPage />} /> */}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
