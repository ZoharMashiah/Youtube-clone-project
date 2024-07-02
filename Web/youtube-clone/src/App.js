import React, { useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Feed from "./pages/Feed/Feed";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import VideoDisplay from "./components/WatchVid/VideoDisplay/VideoDisplay";
import {AppContext, AppContextProvider} from "./AppContext";
import { useEffect } from "react";
import UserPage from "./pages/UserPage/UserPage";

export default function App() {
  const {setCurrentUser, currentUser, setDarkMode, toggleDarkMode} = useContext(AppContext)

  const token = localStorage.getItem("token");
  useEffect(() => {
    const getCurrentUser = async () => {
      if (token) {
        const response = await fetch(`api/tokens/${token}`);
        const data = await response.json();
        if (data.user) {
          setCurrentUser(data.user);
          if (data.user.settings.darkMode == true){
            toggleDarkMode();
          }
        }
      }
    };
    getCurrentUser();
  }, [token]);

  return (
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Feed />} />
            <Route path="/users/:userId/videos/:videoId" element={<VideoDisplay />}/>
            <Route path="/userpage" element={<UserPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
  );
}
