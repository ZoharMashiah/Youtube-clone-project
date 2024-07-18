import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Feed from "./pages/Feed/Feed";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import "./darkMode.css";
import VideoDisplay from "./pages/VideoDisplay/VideoDisplay";
import UserPage from "./pages/UserPage/UserPage";

export default function App() {
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
