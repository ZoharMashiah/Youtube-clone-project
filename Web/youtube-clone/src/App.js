import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Feed from "./pages/Feed/Feed";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import VideoDisplay from "./pages/VideoDisplay/VideoDisplay";
import { AppContext } from "./AppContext";
import { useEffect } from "react";
import UserPage from "./pages/UserPage/UserPage";

export default function App() {
  const { setCurrentUser, toggleDarkMode } = useContext(AppContext);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const getCurrentUser = async () => {
      if (token) {
        try {
          const response = await fetch(`api/tokens/${token}`);
          const data = await response.json();
          if (data.user) {
            setCurrentUser(data.user);
            if (data.user.settings.darkMode) {
              toggleDarkMode();
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    getCurrentUser();
  }, [token, setCurrentUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Feed />} />
          <Route path="/users/:userId/videos/:videoId" element={<VideoDisplay />} />
          <Route path="/userpage/:userId" element={<UserPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
